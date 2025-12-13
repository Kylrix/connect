import json

def inspect_conversations():
    try:
        with open('appwrite.config.json', 'r') as f:
            config = json.load(f)
        
        for table in config.get('tables', []):
            if table.get('name') == 'Conversations':
                print(f"Table: {table.get('name')}")
                for col in table.get('columns', []):
                    if col.get('key') in ['createdAt', 'updatedAt']:
                        print(f"Column: {col.get('key')}")
                        print(f"  Required: {col.get('required')}")
                        print(f"  Default: {col.get('default')}")
                        print(f"  Has Default Key: {'default' in col}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect_conversations()
