<div class="col-sm-3 col-sm-offset-3 col-md-3 col-md-offset-2 main">

	<h1 class="page-header">Battery tracking</h1>

	<form id="batterytracking-form">

		<div class="form-group">
			<label for="battery_id">Battery</label>
			<select class="form-control combobox" id="battery_id" name="battery_id" required>
				<option value=""></option>
				<?php foreach ($batteries as $battery) : ?>
					<option value="<?php echo $battery->id; ?>"><?php echo $battery->name; ?></option>
				<?php endforeach; ?>
			</select>
			<div id="battery-error" class="help-block with-errors"></div>
		</div>

		<div class="form-group">
			<label for="tracked_time">Tracked time</label>
			<div class="input-group date datetimepicker">
				<input type="text" class="form-control" id="tracked_time" name="tracked_time" required >
				<span class="input-group-addon">
					<span class="fa fa-calendar"></span>
				</span>
			</div>
			<div class="help-block with-errors"></div>
		</div>

		<button id="save-batterytracking-button" type="submit" class="btn btn-default">OK</button>

	</form>

</div>

<div class="col-sm-6 col-md-5 col-lg-3 main well">
	<h3>Battery overview <strong><span id="selected-battery-name"></span></strong></h3>

	<p>
		<strong>Charge cycles count:</strong> <span id="selected-battery-charge-cycles-count"></span><br>
		<strong>Last charged:</strong> <span id="selected-battery-last-charged"></span> <time id="selected-battery-last-charged-timeago" class="timeago timeago-contextual"></time><br>
	</p>
</div>
