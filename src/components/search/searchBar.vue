<template>
	<div class="search">
		<div class="search_back" @click="pageAction">
			<svg class="ico back_ico" aria-hidden="true">
				<use xlink:href="#icon-icon1"></use>
			</svg>
		</div>
		<div class="search_inputBar">
			<input type="search" class="search_input" v-model.trim="searchWord" :placeholder="defaultWord"/>
			<div class="search_close" @click="delKeyword">
				<svg class="ico search_close_ico" aria-hidden="true">
					<use xlink:href="#icon-close"></use>
				</svg>
			</div>
		</div>
		<div class="search_btn">
			<svg class="ico search_ico" aria-hidden="true">
				<use xlink:href="#icon-sousuo2"></use>
			</svg>
		</div>
	</div>
</template>


<script>
	
	export default {
		
		data () {
			
			return {
				
				defaultWord: '纤维素醚',
				
				searchWord:''
				
			}
			
		},
		
		methods: {

			pageAction () {
				
				this.$router.back()
				
			},

			delKeyword () {
				
				this.searchWord = ''
				
			}
			
		}
		
	}
	
</script>

<style lang="scss">
	
	.search_close{
		
		height: .58rem;
		
		padding: 0 .25rem;
		
		display:flex;
		
		align-items: center;
		
		justify-content: center;
		
		position: absolute;
		
		right:0;
		
		top:0;
	}
	
	.search{
		
		height: .94rem;
		
		display: flex;
		
		border-bottom: .01rem solid #f1f1f1;
		
		align-items: center;
		
	}
	
	.search_inputBar{
		
		padding-left:.32rem;
		
		margin: .18rem 0;
		
		border-radius: .44rem;
		
		width: 76%;
		
		background: #ededed;
		
		position: relative;
		
		.search_input{
			
			width: 100%;
			
			height:.56rem;
			
			padding: .18rem 0;
			
		}
		
		.search_close_ico{
			
			color:#a2a2a2;
			width: .28rem;
			height: .28rem;
			
		}
		
	}
	
	.search_btn {
		
		width: 12%;
		
		
		display:flex;
		
		align-items: center;
		
		justify-content: center;
		
		height: .94rem;
		
		
		.search_ico{
			
			width: .5rem;
			
			height: .5rem;
			
			color: #008aec;
			
		}
		
	}
	
	.search_back{
		
		width: 12%;
		
		display: flex;
		
		height: .94rem;
		
		justify-content: center;
		
		
		.back_ico{
			
			width: .48rem;
			
			height: .94rem;
			
			color: #008aec;
			
		}
		
	}
</style>