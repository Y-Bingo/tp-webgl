console.log('===== custom loader =====');

const moduleTypesRegEx = /\.(glsl|fs|vs)/; // shader 文件
const systemJSPrototype = System.constructor.prototype;

const glslFetchFunc = (url, options) => {
	return fetch(url, options).then(res => {
		const contentType = res.headers.get('content-type');
		console.log('Custom: loader: contentType = ', contentType);
		return res.text().then(function (str) {
			return new Response(
				new Blob(['System.register([],function(e){return{execute:function(){e("default",' + JSON.stringify(str) + ')}}})'], {
					type: 'application/javascript',
				}),
			);
		});
	});
};

const _fetch = systemJSPrototype.fetch.bind(systemJSPrototype);
systemJSPrototype.fetch = function (url, options) {
	return moduleTypesRegEx.test(url) ? glslFetchFunc(url, options) : _fetch(url, options);
};
