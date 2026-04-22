(function (window) {
	'use strict';

	window.PCC = window.PCC || {};
	window.PCC.RichText = window.PCC.RichText || {};

	const RichText = window.PCC.RichText;

	RichText.ensureCkeditor = function (callback) {
		if (window.CKEDITOR) {
			callback();
			return;
		}

		if (window.FW && typeof FW.Require === 'function') {
			FW.Require('ckeditor.js?v=' + FW.Version, callback);
			return;
		}

		console.error('PCC.RichText could not load CKEditor. FW.Require is unavailable.');
	};

})(window);
