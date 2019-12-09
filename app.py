from flask import Flask, render_template, redirect, url_for,request
from flask import make_response,jsonify
app = Flask("Project")
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def webprint():
    return render_template('map_test.html')
@app.route('/route', methods=['GET', 'POST'])
def test():
    result = (request.form['start'],request.form['start2'])
    print(result)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug = True)
