#!/usr/bin/python3
""" Flash Web Application """
from os import environ
import uuid
from flask import Flask, render_template
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Set a secret key for Flask app security

@app.teardown_appcontext
def close_db(error):
    """ Delete the SQLAlchemy Session """
    storage.close()

@app.route('/2-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is on (alive)! """
    # Get all states, sort them by name
    states = sorted(storage.all(State).values(), key=lambda m: m.name)

    stat_cti = []
    for state in states:
        # For each state, create a list containing the state and its cities sorted by name
        stat_cti.append([state, sorted(state.cities, key=lambda m: m.name)])

    # Get all amenities, sort them by name
    amenities = sorted(storage.all(Amenity).values(), key=lambda m: m.name)

    # Get all places, sort them by name
    places = sorted(storage.all(Place).values(), key=lambda m: m.name)

    # Render the template with the data and a unique cache_id using uuid
    return render_template('2-hbnb.html',
                           states=stat_cti,
                           amenities=amenities,
                           places=places, cache_id=uuid.uuid4())

if __name__ == "__main__":
    # Run the app on host '0.0.0.0' and port 5000
    app.run(host='0.0.0.0', port=5000)
