module.exports = {
	MODELS: [
		{ id: 'msd-v4', label: 'MSD-V4' },
		{ id: 'msd-v6', label: 'MSD-V6' },
	],

	CHOICES_MSD_V4_INPUTS: [
		{ id: 0, label: 'OFF' },
		{ id: 1, label: 'IN 1' },
		{ id: 2, label: 'IN 2' },
		{ id: 3, label: 'IN 3' },
		{ id: 4, label: 'IN 4' },
	],

	CHOICES_MSD_V4_INPUTS_NOOFF: [
		{ id: 1, label: 'IN 1' },
		{ id: 2, label: 'IN 2' },
		{ id: 3, label: 'IN 3' },
		{ id: 4, label: 'IN 4' },
	],

	CHOICES_MSD_V6_INPUTS: [
		{ id: 0, label: 'OFF' },
		{ id: 1, label: 'IN 1' },
		{ id: 2, label: 'IN 2' },
		{ id: 3, label: 'IN 3' },
		{ id: 4, label: 'IN 4' },
		{ id: 5, label: 'IN 5' },
		{ id: 6, label: 'IN 6' },
	],

	CHOICES_MSD_V6_INPUTS_NOOFF: [
		{ id: 1, label: 'IN 1' },
		{ id: 2, label: 'IN 2' },
		{ id: 3, label: 'IN 3' },
		{ id: 4, label: 'IN 4' },
		{ id: 5, label: 'IN 5' },
		{ id: 6, label: 'IN 6' },
	],

	CHOICES_OUTPUT_WINDOWS: [
		{ id: 0, label: 'All Windows' },
		{ id: 1, label: 'Out 1 Main Window' },
		{ id: 2, label: 'Out 2 Main Window' },
		{ id: 201, label: 'Out 1 PinP Window' },
		{ id: 202, label: 'Out 2 PinP Window' },
	],

	CHOICES_OUTPUT_WINDOWS_NOALL: [
		{ id: 1, label: 'Out 1 Main Window' },
		{ id: 2, label: 'Out 2 Main Window' },
		{ id: 201, label: 'Out 1 PinP Window' },
		{ id: 202, label: 'Out 2 PinP Window' },
	],

	CHOICES_OUTPUTS: [
		{ id: 0, label: 'All Outputs' },
		{ id: 1, label: 'OUT 1' },
		{ id: 2, label: 'OUT 2' },
	],

	CHOICES_OUTPUT_CONNECTORS: [
		{ id: 0, label: 'All Outputs' },
		{ id: 1, label: 'Out 1A' },
		{ id: 2, label: 'Out 2A' },
		{ id: 201, label: 'Out 1B' },
		{ id: 202, label: 'Out 2B' },
	],

	CHOICES_MSD_V4_AUDIO_OUTPUT_CHANNELS: [
		{ id: 0, label: 'All Outputs' },
		{ id: 1, label: 'Out 1' },
		{ id: 2, label: 'Out 2' },
		{ id: 401, label: 'Analog Out 1' },
	],

	CHOICES_MSD_V6_AUDIO_OUTPUT_CHANNELS: [
		{ id: 0, label: 'All Outputs' },
		{ id: 1, label: 'Out 1' },
		{ id: 2, label: 'Out 2' },
		{ id: 401, label: 'Analog Out 1' },
		{ id: 402, label: 'Analog Out 2' },
		{ id: 801, label: 'Dante Out 1' },
		{ id: 802, label: 'Dante Out 2' },
	],

	CHOICES_MSD_V4_AUDIO_INPUT_CHANNELS: [
		{ id: 0, label: 'All Inputs' },
		{ id: 1, label: 'In 1' },
		{ id: 2, label: 'In 2' },
		{ id: 3, label: 'In 3' },
		{ id: 4, label: 'In 4' },
	],

	CHOICES_MSD_V6_AUDIO_INPUT_CHANNELS: [
		{ id: 0, label: 'All Inputs' },
		{ id: 1, label: 'In 1' },
		{ id: 2, label: 'In 2' },
		{ id: 3, label: 'In 3' },
		{ id: 4, label: 'In 4' },
		{ id: 5, label: 'In 5' },
		{ id: 6, label: 'In 6' },
	],

	CHOICES_MSD_V4_AUDIO_INPUT_CHANNELS_WITH_ANALOG: [
		{ id: 0, label: 'All Inputs' },
		{ id: 1, label: 'In 1' },
		{ id: 2, label: 'In 2' },
		{ id: 3, label: 'In 3' },
		{ id: 4, label: 'In 4' },
		{ id: 201, label: 'Analog In 1' },
	],

	CHOICES_MSD_V6_AUDIO_INPUT_CHANNELS_WITH_ANALOG: [
		{ id: 0, label: 'All Inputs' },
		{ id: 1, label: 'In 1' },
		{ id: 2, label: 'In 2' },
		{ id: 3, label: 'In 3' },
		{ id: 4, label: 'In 4' },
		{ id: 5, label: 'In 5' },
		{ id: 6, label: 'In 6' },
		{ id: 201, label: 'Analog In 1' },
		{ id: 202, label: 'Analog In 2' },
		{ id: 601, label: 'Dante In 1' },
		{ id: 602, label: 'Dante In 2' },
	],
}
