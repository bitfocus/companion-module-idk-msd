module.exports = {
	initVariables() {
		let self = this
		let variables = []

		//video_main_1, audio_main_1, video_pinp_1, video_main_2, audio_main_2, video_pinp_2
		variables.push({ variableId: `video_main_1`, name: `Video Main 1` })
		variables.push({ variableId: `audio_main_1`, name: `Audio Main 1` })
		variables.push({ variableId: `video_pinp_1`, name: `Video PinP 1` })
		variables.push({ variableId: `video_main_2`, name: `Video Main 2` })
		variables.push({ variableId: `audio_main_2`, name: `Audio Main 2` })
		variables.push({ variableId: `video_pinp_2`, name: `Video PinP 2` })

		//pinp status for 1/2
		variables.push({ variableId: `pinp_display_1`, name: `PinP Display 1` })
		variables.push({ variableId: `pinp_display_2`, name: `PinP Display 2` })

		//audio output status for out1a, out2a, out1b, out2b
		variables.push({ variableId: `audio_out_1a`, name: `Audio Out 1A` })
		variables.push({ variableId: `audio_out_2a`, name: `Audio Out 2A` })
		variables.push({ variableId: `audio_out_1b`, name: `Audio Out 1B` })
		variables.push({ variableId: `audio_out_2b`, name: `Audio Out 2B` })

		//audio output volume level for out1, out2, analogout1
		variables.push({ variableId: `audio_out_1`, name: `Audio Out 1` })
		variables.push({ variableId: `audio_out_2`, name: `Audio Out 2` })
		variables.push({ variableId: `analog_out_1`, name: `Analog Out 1` })

		//audio output volume level for out1, out2, analogout1
		variables.push({ variableId: `audio_out_1_volume`, name: `Audio Out 1 Volume` })
		variables.push({ variableId: `audio_out_2_volume`, name: `Audio Out 2 Volume` })
		variables.push({ variableId: `analog_out_1_volume`, name: `Analog Out 1 Volume` })

		//audio output mute status for out1, out2, analogout1
		variables.push({ variableId: `audio_out_1_mute`, name: `Audio Out 1 Mute` })
		variables.push({ variableId: `audio_out_2_mute`, name: `Audio Out 2 Mute` })
		variables.push({ variableId: `analog_out_1_mute`, name: `Analog Out 1 Mute` })

		//audio input source
		variables.push({ variableId: `audio_in_1`, name: `Audio In 1` })
		variables.push({ variableId: `audio_in_2`, name: `Audio In 2` })
		variables.push({ variableId: `audio_in_3`, name: `Audio In 3` })
		variables.push({ variableId: `audio_in_4`, name: `Audio In 4` })

		//audio input volume
		variables.push({ variableId: `audio_in_1_volume`, name: `Audio In 1 Volume` })
		variables.push({ variableId: `audio_in_2_volume`, name: `Audio In 2 Volume` })
		variables.push({ variableId: `audio_in_3_volume`, name: `Audio In 3 Volume` })
		variables.push({ variableId: `audio_in_4_volume`, name: `Audio In 4 Volume` })
		variables.push({ variableId: `analog_in_1_volume`, name: `Analog In 1 Volume` })

		if (self.config.model == 'msd-v6') {
			//we add some additional vars for v6
			//audio output volume level for analog_out_2, danteout1, danteout2
			variables.push({ variableId: `analog_out_2_volume`, name: `Analog Out 2 Volume` })
			variables.push({ variableId: `dante_out_1_volume`, name: `Dante Out 1 Volume` })
			variables.push({ variableId: `dante_out_2_volume`, name: `Dante Out 2 Volume` })

			//audio output mute status for analog_out_2, danteout1, danteout2
			variables.push({ variableId: `analog_out_2_mute`, name: `Analog Out 2 Mute` })
			variables.push({ variableId: `dante_out_1_mute`, name: `Dante Out 1 Mute` })
			variables.push({ variableId: `dante_out_2_mute`, name: `Dante Out 2 Mute` })

			//audio input source
			variables.push({ variableId: `audio_in_5`, name: `Audio In 5` })
			variables.push({ variableId: `audio_in_6`, name: `Audio In 6` })

			//audio input volume
			variables.push({ variableId: `audio_in_5_volume`, name: `Audio In 5 Volume` })
			variables.push({ variableId: `audio_in_6_volume`, name: `Audio In 6 Volume` })
			variables.push({ variableId: `analog_in_2_volume`, name: `Analog In 2 Volume` })
			variables.push({ variableId: `dante_in_1_volume`, name: `Dante In 1 Volume` })
			variables.push({ variableId: `dante_in_2_volume`, name: `Dante In 2 Volume` })
		}

		self.setVariableDefinitions(variables)
	},
}
