import json

def inspect_added_cols():
    try:
        with open('appwrite.config.json', 'r') as f:
            config = json.load(f)
        
        cols_to_check = ['participants', 'admins', 'avatar', 'encryptionKey', 'contextType', 'contextId']
        
        for table in config.get('tables', []):
            if table.get('name') == 'Conversations':
                print(f"Table: {table.get('name')}")
                for col in table.get('columns', []):
                    if col.get('key') in cols_to_check:
                        print(f"Column: {col.get('key')}")
                        print(f"  Type: {col.get('type')}")
                        print(f"  Required: {col.get('required')}")
                        print(f"  Default: {col.get('default')}")
                        print(f"  Has Default Key: {'default' in col}")
                        print(f"  Array: {col.get('array')}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect_added_cols()
