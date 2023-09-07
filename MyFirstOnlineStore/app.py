from website import create_app


app = create_app()

# за пушить в git
if __name__ == '__main__':
    app.run(debug=True)
