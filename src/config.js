const RichText = window.PCC.RichText;

RichText.version = __VERSION__;

RichText.defaults = {
	profile: 'full',
	height: 300,
	fullPage: false
};

RichText.profiles = {
	full: function () {
		return CKEDITOR.getToolbar('full');
	},
	basic: function () {
		return CKEDITOR.getToolbar('basic');
	}
};

RichText.getEditorConfig = function (field) {
	const config = Object.assign({}, RichText.defaults, field);

	const profileFn = RichText.profiles[config.profile];

	if (!profileFn) {
		console.warn(`PCC.RichText unknown profile "${config.profile}", falling back to full`);
	}
	
	const toolbar = profileFn ? profileFn() : CKEDITOR.getToolbar('full');


	return {
		filebrowserImageBrowseUrl: '/fw/framework/ckfinder/ckfinder.html?type=Images&connector=' + encodeURIComponent('/www/'),
		filebrowserBrowseUrl: '/fw/framework/ckfinder/ckfinder.html?type=Documents&connector=' + encodeURIComponent('/www/'),
		fullPage: config.fullPage,
		height: config.height,
		toolbar: toolbar,

		entities: true,
		basicEntities: true,
		entities_latin: true,
		entities_greek: true,
		entities_processNumerical: 'force'
	};
};
