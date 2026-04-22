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
