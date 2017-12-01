<template>
	<div class="hot_search">
		<div class="hot_search_tit">
			<h4>热门搜索</h4>
		</div>
		<ul class="search_hot_list clearfix">
			<li>
				<span>纤维素醚</span>
			</li>
			<li>
				<span>纤维素醚</span>
			</li>
			<li>
				<span>纤维素醚</span>
			</li>
			<li>
				<span>纤维素醚</span>
			</li>
			<li>
				<span>纤维素醚</span>
			</li>
			<li>
				<span>纤维素醚</span>
			</li>
		</ul>
	</div>
</template>


<style lang="scss">

	.hot_search_tit{
		
		height: .94rem;
		
		display: flex;
		
		align-items: center;
		
	}
	.hot_search{
		
		padding: 0 .3rem;
		
		width:100%;
		
		overflow:hidden;
	}
	
	.search_hot_list{
		
		width: 110%;
		
		li{
			
			float:left;
			
			width: 28.2%;
			
			height: .6rem;
			
			line-height: .6rem;
			
			text-align:center;
			
			margin-right:.2rem;
			
			border:1px solid #cecece;
			
			border-radius: .44rem;
			
			margin-bottom: .22rem;
			
			&:nth-child(3n) {
				
				margin-right:0;
				
			}
			
		}
		
	}
	
</style>