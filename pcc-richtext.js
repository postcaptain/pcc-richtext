/* PCC RichText - bundled build (manual for now) */

(function (window, document) {
	'use strict';

	// ensure namespace once at top
	window.PCC = window.PCC || {};
	window.PCC.RichText = window.PCC.RichText || {};

})(window, document);


/* ===== config.js ===== */
(function (window) {
	'use strict';

	const RichText = window.PCC.RichText;

	RichText.version = '0.1.1';

	RichText.defaults = {
		profile: 'full',
		height: 300,
		fullPage: false
	};

	RichText.getEditorConfig = function (field) {
		const config = Object.assign({}, RichText.defaults, field);

		return {
			filebrowserImageBrowseUrl: '/fw/framework/ckfinder/ckfinder.html?type=Images&connector=' + encodeURIComponent('/www/'),
			filebrowserBrowseUrl: '/fw/framework/ckfinder/ckfinder.html?type=Documents&connector=' + encodeURIComponent('/www/'),
			fullPage: config.fullPage,
			height: config.height,
			toolbar: CKEDITOR.getToolbar(config.profile),

			entities: true,
			basicEntities: true,
			entities_latin: true,
			entities_greek: true,
			entities_processNumerical: 'force'
		};
	})(window);


/* ===== fields.js ===== */
(function (window, document) {
	'use strict';

	const RichText = window.PCC.RichText;

	RichText.getFieldIdFromExport = function (exportName) {
		const container = document.querySelector(`div[data-export="${exportName}"]`);

		if (!container || !container.dataset || !container.dataset.id) {
			return null;
		}

		return `form_${container.dataset.id}`;
	};

})(window, document);


/* ===== loader.js ===== */
(function (window) {
	'use strict';

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


/* ===== editor.js ===== */
(function (window, document) {
	'use strict';

	const RichText = window.PCC.RichText;

	RichText.attachField = function (field) {
		if (!field || !field.export) {
			console.warn('PCC.RichText.attachField skipped invalid field config:', field);
			return;
		}

		const fieldId = RichText.getFieldIdFromExport(field.export);

		if (!fieldId) {
			console.warn(`PCC.RichText could not find field for export "${field.export}"`);
			return;
		}

		const element = document.getElementById(fieldId);

		if (!element) {
			console.warn(`PCC.RichText found export "${field.export}" but not textarea "${fieldId}"`);
			return;
		}

		if (window.CKEDITOR && CKEDITOR.instances && CKEDITOR.instances[fieldId]) {
			CKEDITOR.remove(CKEDITOR.instances[fieldId]);
		}

		CKEDITOR.replace(fieldId, RichText.getEditorConfig(field));
	};

	RichText.attachFields = function (fields) {
		if (!Array.isArray(fields)) {
			console.warn('PCC.RichText.attachFields expected an array.');
			return;
		}

		RichText.ensureCkeditor(function () {
			fields.forEach(function (field) {
				RichText.attachField(field);
			});
		});
	};

})(window, document);
