const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		let self = this

		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This modules controls IDK IP-MSD control boxes.',
			},
			{
				type: 'static-text',
				id: 'hr1',
				width: 12,
				label: ' ',
				value: '<hr />',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 4,
				default: '',
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Port',
				width: 3,
				default: '1100',
			},
			{
				type: 'static-text',
				id: 'hostinfo',
				width: 5,
				label: ' ',
				value: 'The port number is typically 1100.',
			},
			{
				type: 'static-text',
				id: 'hr2',
				width: 12,
				label: ' ',
				value: '<hr />',
			},
			//model selection
			{
				type: 'dropdown',
				id: 'model',
				label: 'Model',
				width: 6,
				default: self.MODELS[0].id,
				choices: self.MODELS,
			},
			{
				type: 'static-text',
				id: 'modelinfo',
				width: 6,
				label: ' ',
				value: 'Select the model of the device you are connecting to.',
			},
			{
				type: 'static-text',
				id: 'hr2',
				width: 12,
				label: ' ',
				value: '<hr />',
			},
			//polling
			{
				type: 'checkbox',
				id: 'polling',
				label: 'Enable Polling',
				width: 3,
				default: false,
			},
			{
				type: 'number',
				id: 'pollInterval',
				label: 'Polling Interval (ms)',
				width: 3,
				default: 1000,
				min: 100,
				max: 10000,
				required: true,
				isVisible: (config) => config.polling,
			},
			{
				type: 'static-text',
				id: 'pollinginfo',
				width: 6,
				label: ' ',
				value: 'Polling is used to keep the module in sync with the device. It is recommended to enable this feature.',
			},
			{
				type: 'static-text',
				id: 'hr3',
				width: 12,
				label: ' ',
				value: '<hr />',
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false,
				width: 3,
			},
			{
				type: 'static-text',
				id: 'info3',
				width: 9,
				label: ' ',
				value: `Enabling Verbose Logging will push all incoming and outgoing data to the log, which is helpful for debugging.`,
			},
		]
	},
}
