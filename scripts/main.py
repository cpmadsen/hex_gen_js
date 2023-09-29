import random
import numpy
from scripts.CharGen_og import myCharacter
#from js import alert, prompt, localStorage, window, confirm, Audio

def roll_new_char():

    new_char = myCharacter()
    
    pyscript.write('ch_name', new_char.name)
    pyscript.write('ch_abil', new_char.abilityScores)
    pyscript.write('ch_a', new_char.align)
    pyscript.write('ch_r', new_char.race)
    pyscript.write('ch_sr', new_char.subrace)
    pyscript.write('ch_class', new_char.characterClass)
    pyscript.write('ch_sex', new_char.sex)
    pyscript.write('ch_hp', new_char.hitPoints)