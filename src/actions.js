module.exports = {
	initActions: function () {
		let self = this
		let actions = {}

		actions.SSW = {
			name: 'Switch Video and Audio Channel Simultaneously',
			description: 'Switch the output window to a video/audio channel',
			options: [
				{
					type: 'dropdown',
					label: 'Input Channel',
					id: 'input',
					default: self.CHOICES_INPUTS[0].id,
					choices: self.CHOICES_INPUTS,
				},
				{
					type: 'dropdown',
					label: 'Output Window',
					id: 'output',
					default: self.CHOICES_OUTPUT_WINDOWS[0].id,
					choices: self.CHOICES_OUTPUT_WINDOWS,
				},
			],
			callback: async function (action) {
				let options = action.options
				let input = options.input
				let output = options.output
				let command = `@SSW,${input},${output}`
				self.sendCommand(command)
			},
		}

		actions.SSV = {
			name: 'Switch Video Channel',
			description: 'Switch the output video channel to a specific video input channel',
			options: [
				{
					type: 'dropdown',
					label: 'Video Input Channel',
					id: 'input',
					default: self.CHOICES_INPUTS[0].id,
					choices: self.CHOICES_INPUTS,
				},
				{
					type: 'dropdown',
					label: 'Output Window',
					id: 'output',
					default: self.CHOICES_OUTPUT_WINDOWS[0].id,
					choices: self.CHOICES_OUTPUT_WINDOWS,
				},
			],
			callback: async function (action) {
				let options = action.options
				let input = options.input
				let output = options.output
				let command = `@SSV,${input},${output}`
				self.sendCommand(command)
			},
		}

		actions.SSA = {
			name: 'Switch Audio Channel',
			description: 'Switch the output audio channel to a specific audio input channel',
			options: [
				{
					type: 'dropdown',
					label: 'Audio Input Channel',
					id: 'input',
					default: self.CHOICES_INPUTS[0].id,
					choices: self.CHOICES_INPUTS,
				},
				{
					type: 'dropdown',
					label: 'Audio Output Channel',
					id: 'output',
					default: self.CHOICES_OUTPUTS[0].id,
					choices: self.CHOICES_OUTPUTS,
				},
			],
			callback: async function (action) {
				let options = action.options
				let command = `@SSA,0,0,1,${options.input},${options.output}`
				self.sendCommand(command)
			},
		}

		actions.SPI = {
			name: 'PinP On/Off',
			description: 'Turn Picture-in-Picture for an output channel on or off',
			options: [
				{
					type: 'dropdown',
					label: 'Output Channel',
					id: 'output',
					default: self.CHOICES_OUTPUTS[0].id,
					choices: self.CHOICES_OUTPUTS,
				},
				{
					type: 'dropdown',
					label: 'PinP Display',
					id: 'pinp_display',
					default: 1,
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On' },
					],
				},
			],
			callback: async function (action) {
				let options = action.options
				let output = options.output
				let pinp_display = options.pinp_display
				let command = `@SPI,${output},${pinp_display}`
				self.sendCommand(command)
			},
		}

		actions.SUC = {
			name: 'Output Audio - On/Off',
			description: 'Turn audio output for an output channel on or off',
			options: [
				{
					type: 'dropdown',
					label: 'Output Connector',
					id: 'output',
					default: self.CHOICES_OUTPUT_CONNECTORS[0].id,
					choices: self.CHOICES_OUTPUT_CONNECTORS,
				},
				{
					type: 'dropdown',
					label: 'Audio Output',
					id: 'audio_output',
					default: 1,
					choices: [
						{ id: 0, label: 'Off' },
						{ id: 1, label: 'On' },
					],
				},
			],
			callback: async function (action) {
				let options = action.options
				let output = options.output
				let audio_output = options.audio_output
				let command = `@SUC,${output},${audio_output}`
				self.sendCommand(command)
			},
		}

		actions.SAV = {
			name: 'Output Audio - Set Level',
			description: 'Set the audio volume for an output channel',
			options: [
				{
					type: 'dropdown',
					label: 'Output Channel',
					id: 'output',
					default: self.CHOICES_AUDIO_OUTPUT_CHANNELS[0].id,
					choices: self.CHOICES_AUDIO_OUTPUT_CHANNELS,
				},
				{
					type: 'number',
					label: 'Volume Level',
					id: 'volume',
					default: 10,
					min: -100,
					max: 10,
					required: true,
				},
			],
			callback: async function (action) {
				let options = action.options
				let output = options.output
				let volume = options.volume
				let command = `@SAV,${output},${volume}`
				self.sendCommand(command)
			},
		}

		actions.SOL = {
			name: 'Output Audio - Increase/Decrease Level',
			description: 'Increase or decrease the audio volume for an output channel',
			options: [
				{
					type: 'dropdown',
					label: 'Output Channel',
					id: 'output',
					default: self.CHOICES_AUDIO_OUTPUT_CHANNELS[0].id,
					choices: self.CHOICES_AUDIO_OUTPUT_CHANNELS,
				},
				{
					type: 'number',
					label: 'Volume Level',
					id: 'volume',
					default: 10,
					min: -100,
					max: 10,
					required: true,
				},
			],
			callback: async function (action) {
				let options = action.options
				let output = options.output
				let volume = options.volume
				let command = `@SOL,${output},${volume}`
				self.sendCommand(command)
			},
		}

		actions.SAM = {
			name: 'Output Audio - Mute/Unmute',
			description: 'Mute or unmute the audio for an output channel',
			options: [
				{
					type: 'dropdown',
					label: 'Output Channel',
					id: 'output',
					default: self.CHOICES_AUDIO_OUTPUT_CHANNELS[0].id,
					choices: self.CHOICES_AUDIO_OUTPUT_CHANNELS,
				},
				{
					type: 'dropdown',
					label: 'Mute',
					id: 'mute',
					default: 1,
					choices: [
						{ id: 0, label: 'Unmute' },
						{ id: 1, label: 'Mute' },
					],
				},
			],
			callback: async function (action) {
				let options = action.options
				let output = options.output
				let mute = options.mute
				let command = `@SAM,${output},${mute}`
				self.sendCommand(command)
			},
		}

		actions.SAS = {
			name: 'Input Audio - Set Source',
			description: 'Set the audio source for an input channel',
			options: [
				{
					type: 'dropdown',
					label: 'Input Channel',
					id: 'input',
					default: self.CHOICES_AUDIO_INPUT_CHANNELS[0].id,
					choices: self.CHOICES_AUDIO_INPUT_CHANNELS,
				},
				{
					type: 'dropdown',
					label: 'Audio Source',
					id: 'audio_source',
					default: 1,
					choices: [
						{ id: 0, label: 'Digital' },
						{ id: 1, label: 'Analog In 1' },
					],
				},
			],
			callback: async function (action) {
				let options = action.options
				let input = options.input
				let audio_source = options.audio_source
				let command = `@SAS,${input},${audio_source}`
				self.sendCommand(command)
			},
		}

		actions.SSO = {
			name: 'Input Audio - Set Level',
			description: 'Set the audio volume for an input channel',
			options: [
				{
					type: 'dropdown',
					label: 'Input Channel',
					id: 'input',
					default: self.CHOICES_AUDIO_INPUT_CHANNELS_WITH_ANALOG[0].id,
					choices: self.CHOICES_AUDIO_INPUT_CHANNELS_WITH_ANALOG,
				},
				{
					type: 'number',
					label: 'Volume Level',
					id: 'volume',
					default: 10,
					min: -100,
					max: 10,
					required: true,
				},
			],
			callback: async function (action) {
				let options = action.options
				let input = options.input
				let volume = options.volume
				let command = `@SSO,${input},${volume}`
				self.sendCommand(command)
			},
		}

		actions.SDZ = {
			name: 'Input Audio - Increase/Decrease Level',
			description: 'Increase or decrease the audio volume for an input channel',
			options: [
				{
					type: 'dropdown',
					label: 'Input Channel',
					id: 'input',
					default: self.CHOICES_AUDIO_INPUT_CHANNELS_WITH_ANALOG[0].id,
					choices: self.CHOICES_AUDIO_INPUT_CHANNELS_WITH_ANALOG,
				},
				{
					type: 'number',
					label: 'Volume Level',
					id: 'volume',
					default: 10,
					min: -100,
					max: 10,
					required: true,
				},
			],
			callback: async function (action) {
				let options = action.options
				let input = options.input
				let volume = options.volume
				let command = `@SDZ,${input},${volume}`
				self.sendCommand(command)
			},
		}

		actions.EXC = {
			name: 'Execute Command',
			description: 'Execute a command',
			options: [
				{
					type: 'number',
					label: 'Command Number',
					id: 'command',
					default: 1,
					min: 1,
					max: 64,
					required: true,
				},
			],
			callback: async function (action) {
				let options = action.options
				let command = `@EXC,${options.command}`
				self.sendCommand(command)
			},
		}

		actions.RCM = {
			name: 'Load Crosspoint Preset',
			description: 'Load a crosspoint preset',
			options: [
				{
					type: 'number',
					label: 'Crosspoint Number',
					id: 'crosspoint',
					default: 1,
					min: 1,
					max: 9,
					required: true,
				},
			],
			callback: async function (action) {
				let options = action.options
				let command = `@RCM,${options.crosspoint}`
				self.sendCommand(command)
			},
		}

		actions.RPM = {
			name: 'Recall Preset Memory',
			description: 'Recall a preset memory',
			options: [
				{
					type: 'number',
					label: 'Preset Number',
					id: 'preset',
					default: 1,
					min: 1,
					max: 9,
					required: true,
				},
			],
			callback: async function (action) {
				let options = action.options
				let command = `@RPM,${options.preset}`
				self.sendCommand(command)
			},
		}

		actions.sendCustomCommand = {
			name: 'Send Custom Command',
			description: 'Send a custom command to the device',
			options: [
				{
					type: 'textinput',
					label: 'Command',
					id: 'command',
					default: '',
					useVariables: true,
				},
			],
			callback: async function (action) {
				let options = action.options
				let command = await self.parseVariablesInString(options.command)
				self.sendCommand(command)
			},
		}

		self.setActionDefinitions(actions)
	},
}
