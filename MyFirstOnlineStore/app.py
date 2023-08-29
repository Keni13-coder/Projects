from website import create_app


app = create_app()



match __name__:
    case '__main__':
        app.run(debug=True)
