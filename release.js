var exec = require('child_process').exec;

function pack() {

	return new Promise ( (resolve,reject) => {

		exec('npm run build',(err,stdout,stderr) => {

			if (err) {
				console.log(err);

				throw new Error(err);
				reject(err)
			}

			console.log(stdout)

			resolve(stdout)
		})

	})

}

pack().then((resolve,reject) => {
	exec('scp -r /Users/leafrontye/niutu/niuhuagong/dist/* root@111.231.103.97:/data/dev/h5-niuhuagong',(err, stdout, stderr) =>{

		if (err) {

			console.log(err);

			throw new Error(err);

		}

		console.log(stdout);

	})

})

