var debug = 0;
var mode = 0;
// 0 rhythm
// 1 pitch

var scale = 0;
var division = 0.03125; //128th

var api = new LiveAPI("live_set");
var gates = [];
var bc = [];



function anything()
{
	var a = arrayfromargs(messagename, arguments);
	//pitches = ?
}

function list()
{
	var a = arrayfromargs(arguments);
	gates = a;
	if(debug) post(gates + "\n");
	bang()
}

function bang()
{
	//api.call("create_midi_track", -1);
	var trackCount = api.get("tracks");
	var newestTrack = (trackCount.length / 2) - 1  ;	// ( /2 - 1 )
	api2 = new LiveAPI("live_set tracks " + newestTrack);
	//api2.set("name", "MIDI barcode");
	var clipSlotOffset = 0;
	var clipSlot = new LiveAPI("live_set tracks " + newestTrack + " clip_slots " + clipSlotOffset);
	var hasClip = clipSlot.get("has_clip")
	while(hasClip == 1) 
	{
		post(clipSlotOffset, "hasCLIP", hasClip);
		clipSlotOffset += 1;
 		clipSlot = new LiveAPI("live_set tracks " + newestTrack + " clip_slots " + clipSlotOffset);
		hasClip = clipSlot.get("has_clip")
	}

	clipSlot.call("create_clip", 1);


	
	var clip = new LiveAPI("live_set tracks " + newestTrack + " clip_slots " + clipSlotOffset + " clip");
	clip.set("name", "barCode");
	var clipLength = 8;
	clip.set("loop_end", clipLength);
	
	
	var notesToWrite = gates.length;
	clip.call("set_notes");
	clip.call("notes", notesToWrite);
	var pitch = 60;
	var rootPitch = 0;
	var start;
	var duration;
	//var division = 0.125;
	var delta = 0.0;
	var velocity = 100;
	
	for(var x = 0; x < notesToWrite; x++) 
	{
		start = delta.toFixed(8);	
		duration = (1 * division).toFixed(8);
		mute = (gates[x] - 1) * -1;		
		clip.call("note", pitch, start, duration, velocity, mute); // length in floats is 1.0 = 4n
		delta = parseFloat(start) + parseFloat(duration);
			
	}
	clip.call("done");
	
	var clipName;
	for (var i = 0; i < bc.length; i++)
	{
		// is this even needed? isn't there a .toString?
	}	
	//clip.set("name", clipName);
}

function clipSlotCheck(_clipSlotOffset)
{


	return clipSlot;
}
