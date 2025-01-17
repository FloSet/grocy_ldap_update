﻿$('#save-barcode-button').on('click', function(e)
{
	e.preventDefault();

	if ($(".combobox-menu-visible").length)
	{
		return;
	}

	var jsonData = $('#barcode-form').serializeJSON();
	jsonData.amount = jsonData.display_amount;
	delete jsonData.display_amount;
	jsonData.qu_id = $("#qu_id").val();

	Grocy.FrontendHelpers.BeginUiBusy("barcode-form");

	if (Grocy.EditMode === 'create')
	{
		Grocy.Api.Post('objects/product_barcodes', jsonData,
			function(result)
			{
				Grocy.EditObjectId = result.created_object_id;
				Grocy.Components.UserfieldsForm.Save()

				window.parent.postMessage(WindowMessageBag("ProductBarcodesChanged"), U("/product/" + GetUriParam("product")));
				window.parent.postMessage(WindowMessageBag("CloseAllModals"), U("/product/" + GetUriParam("product")));
			},
			function(xhr)
			{
				Grocy.FrontendHelpers.EndUiBusy("barcode-form");
				Grocy.FrontendHelpers.ShowGenericError('Error while saving, probably this item already exists', xhr.response);
			}
		);
	}
	else
	{
		Grocy.Components.UserfieldsForm.Save();
		Grocy.Api.Put('objects/product_barcodes/' + Grocy.EditObjectId, jsonData,
			function(result)
			{
				window.parent.postMessage(WindowMessageBag("ProductBarcodesChanged"), U("/product/" + GetUriParam("product")));
				window.parent.postMessage(WindowMessageBag("CloseAllModals"), U("/product/" + GetUriParam("product")));
			},
			function(xhr)
			{
				Grocy.FrontendHelpers.EndUiBusy("barcode-form");
				Grocy.FrontendHelpers.ShowGenericError('Error while saving, probably this item already exists', xhr.response);
			}
		);
	}
});

$('#barcode').on('keyup', function(e)
{
	Grocy.FrontendHelpers.ValidateForm('barcode-form');
});

$('#qu_id').on('change', function(e)
{
	Grocy.FrontendHelpers.ValidateForm('barcode-form');
});

$('#display_amount').on('keyup', function(e)
{
	Grocy.FrontendHelpers.ValidateForm('barcode-form');
});

$('#barcode-form input').keydown(function(event)
{
	if (event.keyCode === 13) //Enter
	{
		event.preventDefault();

		if (document.getElementById('barcode-form').checkValidity() === false) //There is at least one validation error
		{
			return false;
		}
		else
		{
			$('#save-barcode-button').click();
		}
	}
});

Grocy.Components.ProductAmountPicker.Reload(Grocy.EditObjectProduct.id, Grocy.EditObjectProduct.qu_id_purchase);
if (Grocy.EditMode == "edit")
{
	$("#display_amount").val(Grocy.EditObject.amount);
	$(".input-group-productamountpicker").trigger("change");
	Grocy.Components.ProductAmountPicker.SetQuantityUnit(Grocy.EditObject.qu_id);
}

Grocy.FrontendHelpers.ValidateForm('barcode-form');
setTimeout(function()
{
	$('#barcode').focus();
}, 250);
RefreshLocaleNumberInput();
Grocy.Components.UserfieldsForm.Load()

$(document).on("Grocy.BarcodeScanned", function(e, barcode, target)
{
	if (target !== "#barcode")
	{
		return;
	}

	$("#barcode").val(barcode);
});
