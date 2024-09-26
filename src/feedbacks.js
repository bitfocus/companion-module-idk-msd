const { combineRgb } = require('@companion-module/base')

module.exports = {
	initFeedbacks: function () {
		let self = this
		let feedbacks = {}

		const colorWhite = combineRgb(255, 255, 255) // White
		const colorRed = combineRgb(255, 0, 0) // Red

		feedbacks.GSV = {
			type: 'boolean',
			name: 'Selected Video Input is Routed to Selected Video Output',
			description:
				'Change the button color based on the selected video input being routed to the selected video output',
			defaultStyle: {
				color: colorWhite,
				bgcolor: colorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Input Channel',
					id: 'input',
					default: self.CHOICES_INPUTS_NOOFF[0].id,
					choices: self.CHOICES_INPUTS_NOOFF,
				},
				{
					type: 'dropdown',
					label: 'Output Window',
					id: 'output',
					default: self.CHOICES_OUTPUT_WINDOWS_NOALL[0].id,
					choices: self.CHOICES_OUTPUT_WINDOWS_NOALL,
				},
			],
			callback: function (feedback, bank) {
				let options = feedback.options
				let input = options.input
				let output = options.output

				if (output == 1) {
					if (self.DATA.videoMain1 == input) {
						return true
					}
				} else if (output == 2) {
					if (self.DATA.videoMain2 == input) {
						return true
					}
				} else if (output == 201) {
					if (self.DATA.videoPinp1 == input) {
						return true
					}
				} else if (output == 202) {
					if (self.DATA.videoPinp2 == input) {
						return true
					}
				}

				return false
			},
		}

		feedbacks.GSA = {
			type: 'boolean',
			name: 'Selected Audio Input is Routed to Selected Audio Output',
			description:
				'Change the button color based on the selected audio input being routed to the selected audio output',
			defaultStyle: {
				color: colorWhite,
				bgcolor: colorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Input Channel',
					id: 'input',
					default: self.CHOICES_INPUTS_NOOFF[0].id,
					choices: self.CHOICES_INPUTS_NOOFF,
				},
				{
					type: 'dropdown',
					label: 'Output Window',
					id: 'output',
					default: self.CHOICES_OUTPUT_WINDOWS_NOALL[0].id,
					choices: self.CHOICES_OUTPUT_WINDOWS_NOALL,
				},
			],
			callback: function (feedback, bank) {
				let options = feedback.options
				let input = options.input
				let output = options.output

				if (output == 1) {
					if (self.DATA.audioMain1 == input) {
						return true
					}
				} else if (output == 2) {
					if (self.DATA.audioMain2 == input) {
						return true
					}
				} else if (output == 201) {
					if (self.DATA.audioPinp1 == input) {
						return true
					}
				} else if (output == 202) {
					if (self.DATA.audioPinp2 == input) {
						return true
					}
				}
			},
		}

		self.setFeedbackDefinitions(feedbacks)
	},
}
