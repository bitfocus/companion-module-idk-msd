const { InstanceStatus, TCPHelper } = require('@companion-module/base')

module.exports = {
	setUpChoices() {
		let self = this

		if (self.config.model == 'msd-v4') {
			self.CHOICES_INPUTS = self.CHOICES_MSD_V4_INPUTS
			self.CHOICES_INPUTS_NOOFF = self.CHOICES_MSD_V4_INPUTS_NOOFF
			self.CHOICES_AUDIO_OUTPUT_CHANNELS = self.CHOICES_MSD_V4_AUDIO_OUTPUT_CHANNELS
			self.CHOICES_AUDIO_INPUT_CHANNELS = self.CHOICES_MSD_V4_AUDIO_INPUT_CHANNELS
			self.CHOICES_AUDIO_INPUT_CHANNELS_WITH_ANALOG = self.CHOICES_MSD_V4_AUDIO_INPUT_CHANNELS_WITH_ANALOG
		} else if (self.config.model == 'msd-v6') {
			self.CHOICES_INPUTS = self.CHOICES_MSD_V6_INPUTS
			self.CHOICES_INPUTS_NOOFF = self.CHOICES_MSD_V6_INPUTS_NOOFF
			self.CHOICES_AUDIO_OUTPUT_CHANNELS = self.CHOICES_MSD_V6_AUDIO_OUTPUT_CHANNELS
			self.CHOICES_AUDIO_INPUT_CHANNELS = self.CHOICES_MSD_V6_AUDIO_INPUT_CHANNELS
			self.CHOICES_AUDIO_INPUT_CHANNELS_WITH_ANALOG = self.CHOICES_MSD_V6_AUDIO_INPUT_CHANNELS_WITH_ANALOG
		}
	},

	async initConnection() {
		let self = this

		if (self.config.host && self.config.host !== '') {
			self.openSocket()
		}
	},

	openSocket() {
		let self = this

		//clear any existing intervals
		clearInterval(self.INTERVAL)

		self.updateStatus(InstanceStatus.Connecting)

		self.socket = new TCPHelper(self.config.host, self.config.port)

		self.socket.on('connect', () => {
			self.updateStatus(InstanceStatus.Ok)

			self.getData() //get initial data
			//start polling, if enabled
			if (self.config.polling) {
				self.INTERVAL = setInterval(() => {
					self.getData()
				}, self.config.pollInterval)
			}

			//send any commands in the queue
			if (self.commandQueue) {
				self.commandQueue.forEach((command) => {
					if (self.config.verbose) {
						self.log('debug', `Sending queued command: ${command}`)
					}
					self.sendCommand(command)
				})
			}
		})

		self.socket.on('error', (error) => {
			self.log('error', error.toString())
			self.updateStatus(InstanceStatus.UnknownError)
		})

		self.socket.on('data', (data) => {
			self.processData(data)
		})

		self.socket.on('close', () => {
			self.updateStatus(InstanceStatus.Disconnected)
		})
	},

	getData() {
		let self = this

		//get data from the device
		self.sendCommand('@GSW') //Switching video and audio channel simultaneously
		self.sendCommand('@GPI,0') //PinP Status
		self.sendCommand('@GUC,0') //Output Audio Status
		self.sendCommand('@GAV,0') //Output Audio Volume Levels
		self.sendCommand('@GAM,0') //Output Audio Mute Status
		self.sendCommand('@GAS,0') //Input Audio Source Status
		send.sendCommand('@GSO,0') //Input Audio Volume Levels
	},

	async processData(data) {
		let self = this

		let response = data.toString()
		let sections = response.split(',')

		if (self.config.verbose) {
			self.log('debug', `Received: ${response}`)
		}

		if (sections[0].indexOf('@ERR') !== -1) {
			self.log('error', response)
			self.log('error', `Last Command: ${self.lastCommand}`)

			let errorCode = parseInt(sections[1]) //ensure this is an integer

			if (errorCode === 1) {
				self.log('error', 'Erroneous parameter format or value')
			} else if (errorCode === 2) {
				self.log('error', 'Undefined command or wrong format')
			} else if (errorCode === 3) {
				self.log('error', 'The command could not be executed')
			} else if (errorCode === 4) {
				self.log('error', 'Loading EDID from the sink device failed')
			} else if (errorCode === 10) {
				self.log('error', 'The command could not be executed, because it is in standby status')
			} else if (errorCode === 30) {
				self.log('error', 'The command could not be executed, because the control command was not registered')
			} else if (errorCode === 31) {
				self.log('error', 'The command could not be executed since another command was being executed')
			} else if (errorCode === 32) {
				self.log('error', 'The control command was stopped according to the stop condition')
			} else if (errorCode === 33) {
				self.log(
					'error',
					'The control command was stopped since the number of retries exceeded the set value of RETRY'
				)
			} else if (errorCode === 34) {
				self.log('error', 'The control command of PJLink was stopped since the password did not match')
			}

			return
		}

		let variableObj = {}

		switch (sections[0]) {
			case '@GSW':
				//@GSW,video_main_1,audio_main_1,video_pinp_1,video_main_2,audio_main_2,video_pinp_2<CR><LF>
				//video_main_1 = video input channel for main video output 1
				//audio_main_1 = audio input channel for main video output 1
				//video_pinp_1 = video input channel for picture-in-picture output 1
				//video_main_2 = video input channel for main video output 2
				//audio_main_2 = audio input channel for main video output 2
				//video_pinp_2 = video input channel for picture-in-picture output 2
				self.DATA.videoMain1 = parseInt(sections[1])
				self.DATA.audioMain1 = parseInt(sections[2])
				self.DATA.videoPinp1 = parseInt(sections[3])
				self.DATA.videoMain2 = parseInt(sections[4])
				self.DATA.audioMain2 = parseInt(sections[5])
				self.DATA.videoPinp2 = parseInt(sections[6])

				variableObj[`video_main_1`] = self.DATA.videoMain1
				variableObj[`audio_main_1`] = self.DATA.audioMain1
				variableObj[`video_pinp_1`] = self.DATA.videoPinp1
				variableObj[`video_main_2`] = self.DATA.videoMain2
				variableObj[`audio_main_2`] = self.DATA.audioMain2
				variableObj[`video_pinp_2`] = self.DATA.videoPinp2
				break
			case '@GPI':
				//@GPI,pinp_display_1,pinp_display_2<CR><LF>
				//pinp_display_1 = pinp display status for output 1
				//pinp_display_2 = pinp display status for output 2
				self.DATA.pinpDisplay1 = parseInt(sections[1])
				self.DATA.pinpDisplay2 = parseInt(sections[2])

				variableObj[`pinp_display_1`] = self.DATA.pinpDisplay1 == 0 ? 'Off' : 'On'
				variableObj[`pinp_display_2`] = self.DATA.pinpDisplay2 == 0 ? 'Off' : 'On'
				break
			case '@GUC':
				//@GUC,audio_out_1a,audio_out_2a,audio_out_1b,audio_out_2b<CR><LF>
				//audio_out_1a = audio output status for out1a
				//audio_out_2a = audio output status for out2a
				//audio_out_1b = audio output status for out1b
				//audio_out_2b = audio output status for out2b
				self.DATA.audioOut1A = parseInt(sections[1])
				self.DATA.audioOut2A = parseInt(sections[2])
				self.DATA.audioOut1B = parseInt(sections[3])
				self.DATA.audioOut2B = parseInt(sections[4])

				variableObj[`audio_out_1a`] = self.DATA.audioOut1A == 0 ? 'Off' : 'On'
				variableObj[`audio_out_2a`] = self.DATA.audioOut2A == 0 ? 'Off' : 'On'
				variableObj[`audio_out_1b`] = self.DATA.audioOut1B == 0 ? 'Off' : 'On'
				variableObj[`audio_out_2b`] = self.DATA.audioOut2B == 0 ? 'Off' : 'On'
				break
			case '@GAV':
				//@GAV,out1,out2,analogout1
				//out1 = audio output volume level for out1
				//out2 = audio output volume level for out2
				//analogout1 = audio output volume level for analogout1
				self.DATA.audioOut1Volume = parseInt(sections[1])
				self.DATA.audioOut2Volume = parseInt(sections[2])
				self.DATA.analogOut1Volume = parseInt(sections[3])

				//see if sections 4, 5, 6 are present as these are MSD-V6 only
				if (sections.length >= 6) {
					self.DATA.analogOut2Volume = parseInt(sections[4])
					self.DATA.dante1Volume = parseInt(sections[5])
					self.DATA.dante2Volume = parseInt(sections[6])

					variableObj[`analog_out_2_volume`] = self.DATA.analogOut2Volume
					variableObj[`dante1_volume`] = self.DATA.dante1Volume
					variableObj[`dante2_volume`] = self.DATA.dante2Volume
				}

				variableObj[`audio_out_1_volume`] = self.DATA.audioOut1Volume
				variableObj[`audio_out_2_volume`] = self.DATA.audioOut2Volume
				variableObj[`analog_out_1_volume`] = self.DATA.analogOut1Volume
				break
			case '@GAM':
				//@GAM,out1,out2,analogout1
				//out1 = audio output mute status for out1
				//out2 = audio output mute status for out2
				//analogout1 = audio output mute status for analogout1
				self.DATA.audioOut1Mute = parseInt(sections[1])
				self.DATA.audioOut2Mute = parseInt(sections[2])
				self.DATA.analogOut1Mute = parseInt(sections[3])

				//see if sections 4, 5, 6 are present as these are MSD-V6 only
				if (sections.length >= 6) {
					self.DATA.analogOut2Mute = parseInt(sections[4])
					self.DATA.danteOut1Mute = parseInt(sections[5])
					self.DATA.danteOut2Mute = parseInt(sections[6])

					variableObj[`analog_out_2_mute`] = self.DATA.analogOut2Mute == 0 ? 'Off' : 'On'
					variableObj[`dante_out_1_mute`] = self.DATA.danteOut1Mute == 0 ? 'Off' : 'On'
					variableObj[`dante_out_2_mute`] = self.DATA.danteOut2Mute == 0 ? 'Off' : 'On'
				}

				variableObj[`audio_out_1_mute`] = self.DATA.audioOut1Mute == 0 ? 'Off' : 'On'
				variableObj[`audio_out_2_mute`] = self.DATA.audioOut2Mute == 0 ? 'Off' : 'On'
				variableObj[`analog_out_1_mute`] = self.DATA.analogOut1Mute == 0 ? 'Off' : 'On'
				break
			case '@GAS':
				//@GAS,in1,in2,in3,in4
				//in1 = input audio source status for in1
				//in2 = input audio source status for in2
				//in3 = input audio source status for in3
				//in4 = input audio source status for in4
				self.DATA.audioIn1 = parseInt(sections[1])
				self.DATA.audioIn2 = parseInt(sections[2])
				self.DATA.audioIn3 = parseInt(sections[3])
				self.DATA.audioIn4 = parseInt(sections[4])

				//see if section 5 and 6 is present as this is MSD-V6 only
				if (sections.length >= 6) {
					self.DATA.audioIn5 = parseInt(sections[5])
					self.DATA.audioIn6 = parseInt(sections[6])

					//if audioin1 = 0, it is digial, 1 = analog in 1, 2 = analog in 2, 601 = dante in 1, 602 = dante in 2
					variableObj[`audio_in_1`] =
						self.DATA.audioIn1 == 0
							? 'Digital'
							: self.DATA.audioIn1 == 1
								? 'Analog In 1'
								: self.DATA.audioIn1 == 2
									? 'Analog In 2'
									: self.DATA.audioIn1 == 601
										? 'Dante In 1'
										: 'Dante In 2'
					variableObj[`audio_in_2`] =
						self.DATA.audioIn2 == 0
							? 'Digital'
							: self.DATA.audioIn2 == 1
								? 'Analog In 1'
								: self.DATA.audioIn2 == 2
									? 'Analog In 2'
									: self.DATA.audioIn2 == 601
										? 'Dante In 1'
										: 'Dante In 2'
					variableObj[`audio_in_3`] =
						self.DATA.audioIn3 == 0
							? 'Digital'
							: self.DATA.audioIn3 == 1
								? 'Analog In 1'
								: self.DATA.audioIn3 == 2
									? 'Analog In 2'
									: self.DATA.audioIn3 == 601
										? 'Dante In 1'
										: 'Dante In 2'
					variableObj[`audio_in_4`] =
						self.DATA.audioIn4 == 0
							? 'Digital'
							: self.DATA.audioIn4 == 1
								? 'Analog In 1'
								: self.DATA.audioIn4 == 2
									? 'Analog In 2'
									: self.DATA.audioIn4 == 601
										? 'Dante In 1'
										: 'Dante In 2'
					variableObj[`audio_in_5`] =
						self.DATA.audioIn5 == 0
							? 'Digital'
							: self.DATA.audioIn5 == 1
								? 'Analog In 1'
								: self.DATA.audioIn5 == 2
									? 'Analog In 2'
									: self.DATA.audioIn5 == 601
										? 'Dante In 1'
										: 'Dante In 2'
					variableObj[`audio_in_6`] =
						self.DATA.audioIn6 == 0
							? 'Digital'
							: self.DATA.audioIn6 == 1
								? 'Analog In 1'
								: self.DATA.audioIn6 == 2
									? 'Analog In 2'
									: self.DATA.audioIn6 == 601
										? 'Dante In 1'
										: 'Dante In 2'
				} else {
					variableObj[`audio_in_1`] = self.DATA.audioIn1 == 0 ? 'Digital' : 'Analog In 1'
					variableObj[`audio_in_2`] = self.DATA.audioIn2 == 0 ? 'Digital' : 'Analog In 1'
					variableObj[`audio_in_3`] = self.DATA.audioIn3 == 0 ? 'Digital' : 'Analog In 1'
					variableObj[`audio_in_4`] = self.DATA.audioIn4 == 0 ? 'Digital' : 'Analog In 1'
				}
				break
			case '@GSO':
				//@GSO,in1,in2,in3,in4
				//in1 = input audio volume level for in1
				//in2 = input audio volume level for in2
				//in3 = input audio volume level for in3
				//in4 = input audio volume level for in4
				//analogin1 = input audio volume level for analogin1
				self.DATA.audioIn1Volume = parseInt(sections[1])
				self.DATA.audioIn2Volume = parseInt(sections[2])
				self.DATA.audioIn3Volume = parseInt(sections[3])
				self.DATA.audioIn4Volume = parseInt(sections[4])

				//see if sections 6, 7, 8, 9, 10 are present as these are MSD-V6 only
				if (sections.length >= 10) {
					//in 5, 6, analog 1, analog 2, dante 1, dante 2
					self.DATA.audioIn5Volume = parseInt(sections[5])
					self.DATA.audioIn6Volume = parseInt(sections[6])
					self.DATA.analogIn1Volume = parseInt(sections[7])
					self.DATA.analogIn2Volume = parseInt(sections[8])
					self.DATA.danteIn1Volume = parseInt(sections[9])
					self.DATA.danteIn2Volume = parseInt(sections[10])

					variableObj[`audio_in_5_volume`] = self.DATA.audioIn5Volume
					variableObj[`audio_in_6_volume`] = self.DATA.audioIn6Volume
					variableObj[`analog_in_1_volume`] = self.DATA.analogIn1Volume
					variableObj[`analog_in_2_volume`] = self.DATA.analogIn2Volume
					variableObj[`dante_in_1_volume`] = self.DATA.danteIn1Volume
					variableObj[`dante_in_2_volume`] = self.DATA.danteIn2Volume
				} else {
					self.DATA.analogIn1Volume = parseInt(sections[5])
					variableObj[`analog_in_1_volume`] = self.DATA.analogIn1Volume
				}

				variableObj[`audio_in_1_volume`] = self.DATA.audioIn1Volume
				variableObj[`audio_in_2_volume`] = self.DATA.audioIn2Volume
				variableObj[`audio_in_3_volume`] = self.DATA.audioIn3Volume
				variableObj[`audio_in_4_volume`] = self.DATA.audioIn4Volume
				break
			default:
				break
		}

		self.setVariableValues(variableObj)
		self.checkFeedbacks()
	},

	async sendCommand(command) {
		let self = this

		if (self.socket && self.socket.isConnected) {
			if (self.config.verbose) {
				self.log('debug', `Sending: ${command}`)
			}

			self.socket.send(command + '\r\n')
			self.lastCommand = command

			//remove from queue if needed
			if (self.commandQueue) {
				let index = self.commandQueue.indexOf(command)
				if (index !== -1) {
					self.commandQueue.splice(index, 1)
				}
			}
		} else {
			self.log('error', 'Socket not connected. Attempting to reconnect...')
			self.addToQueue(command)
			self.openSocket()
		}
	},

	addToQueue(command) {
		let self = this

		if (!self.commandQueue) {
			self.commandQueue = []
		}

		if (self.config.verbose) {
			self.log('debug', `Adding to queue: ${command}`)
		}

		self.commandQueue.push(command)

		console.log(self.commandQueue)
	},
}
