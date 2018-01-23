import utils from '@/widget/utils'

import { mapGetters } from 'vuex'

export const loading =  {
	computed: {
		...mapGetters({
			'pageView':'getPageView',
		})
	},
	methods: {
		showLoading () {

			utils.setTimeout(() => {
				if (!this.pageView) {

					this.$showLoading()
				}
			},500)

		}
	}

}