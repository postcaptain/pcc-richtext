const RichText = window.PCC.RichText;

RichText.addBodyCss = function (field, fieldId) {
	if (!field || !field.bodyCss) {
		return '';
	}

	if (typeof field.bodyCss !== 'string') {
		console.warn('PCC.RichText bodyCss expected a string:', field);
		return '';
	}

	const safeFieldId = fieldId.replace(/[^a-zA-Z0-9_-]/g, '-');
	const bodyClass = `pcc-richtext-body-${safeFieldId}`;

	CKEDITOR.addCss(`
		body.${bodyClass} {
			${field.bodyCss}
		}
	`);

	return bodyClass;
};

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

	const config = RichText.getEditorConfig(field);
	const bodyClass = RichText.addBodyCss(field, fieldId);

	if (bodyClass) {
		config.bodyClass = config.bodyClass
			? `${config.bodyClass} ${bodyClass}`
			: bodyClass;
	}
	
	CKEDITOR.replace(fieldId, config);
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
