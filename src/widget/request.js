import axios from 'axios'

export const get = (url, info = {}) => {

	return axios.get(url,{

		params:info

	}).then(res=>{

		if(res.status == 200){

			return res.data

		}else{

			return false

		}
	}).catch(err=>{

		console.log(err)

	})

}

export const post = (url, info) => {

	return axios.post(url,info).then(res=>{

		if(res.status==200){

			return res.data

		}else{

			return false

		}
	}).catch(err=>{

		console.log(err)

	})
}