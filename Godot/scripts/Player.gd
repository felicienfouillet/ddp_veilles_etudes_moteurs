extends KinematicBody2D

var screen_size

var anim_player

const SPEED = 250
const JUMP = 500
const GRAVITY = 50
const MAX_FALL_VELOCITY = 500

var y_velocity = 0
var facing_right = false


# Called when the node enters the scene tree for the first time.
func _ready():
#	screen_size = get_viewport_rect().size
	anim_player =  $AnimatedSprite
	
func _physics_process(delta):
	var dir = 0

	if Input.is_action_pressed("ui_left"):
		dir -=1
	elif Input.is_action_pressed("ui_right"):
		dir +=1
		
	move_and_slide(Vector2(dir * SPEED, y_velocity), Vector2(0, -1))

	var onFloor = is_on_floor();
	if onFloor and Input.is_action_pressed("ui_up"):
		y_velocity -= JUMP
	if onFloor and y_velocity >= 5:
		y_velocity = 5
	if y_velocity > MAX_FALL_VELOCITY:
		y_velocity = MAX_FALL_VELOCITY

	if facing_right and dir > 0:
		flipSprite()
	if !facing_right and dir < 0:
		flipSprite()
		
	if onFloor:
		if dir == 0:
			PlayAnim('idle')
		else:
			PlayAnim('run')
	else:
		PlayAnim('jump')

func flipSprite():
	facing_right = !facing_right
	anim_player.flip_h = !anim_player.flip_h

func PlayAnim(name):
	if anim_player.is_playing() and anim_player.animation == name:
		return
	anim_player.play(name)
	
