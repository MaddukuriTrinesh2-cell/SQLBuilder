from sqlalchemy import create_engine, inspect

def get_db_schema(db_type, username, password, host, port, db_name):
    try:
        if db_type == 'postgresql':
            url = f'postgresql://{username}:{password}@{host}:{port}/{db_name}'
        elif db_type == 'mysql':
            url = f'mysql+pymysql://{username}:{password}@{host}:{port}/{db_name}'
        elif db_type == 'sqlite':
            url = f'sqlite:///{db_name}'
        else:
            raise ValueError("Unsupported database type")

        engine = create_engine(url)
        inspector = inspect(engine)
        
        schema = {}
        for table_name in inspector.get_table_names():
            columns = []
            for column in inspector.get_columns(table_name):
                columns.append({
                    'name': column['name'],
                    'type': str(column['type'])
                })
            schema[table_name] = columns
            
        return schema
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None
