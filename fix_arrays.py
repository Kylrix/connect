import json

def fix_array_defaults():
    try:
        with open('appwrite.config.json', 'r') as f:
            config = json.load(f)
        
        modified = False
        
        if 'tables' in config:
            for table in config['tables']:
                if 'columns' in table:
                    for col in table['columns']:
                        # Check if it's an array
                        if col.get('array') is True:
                            # If it's optional (required: false)
                            if col.get('required') is False:
                                # If default is null or missing, set it to []
                                if col.get('default') is None:
                                    print(f"Updating Table '{table.get('name')}' Column '{col.get('key')}' (Array) to DEFAULT=[]")
                                    col['default'] = []
                                    modified = True
                            
                            # If it's required (required: true)
                            elif col.get('required') is True:
                                # Ensure no default
                                if 'default' in col:
                                    print(f"Removing default from Table '{table.get('name')}' Column '{col.get('key')}' (Required Array)")
                                    del col['default']
                                    modified = True
                                
                                # SPECIAL CASE: participants and tags were causing issues. 
                                # Let's make them optional with default [] to be safe during migration
                                if col.get('key') in ['participants', 'tags']:
                                    print(f"Downgrading Table '{table.get('name')}' Column '{col.get('key')}' to REQUIRED=FALSE and DEFAULT=[]")
                                    col['required'] = False
                                    col['default'] = []
                                    modified = True

        if modified:
            with open('appwrite.config.json', 'w') as f:
                json.dump(config, f, indent=4)
            print("Successfully updated appwrite.config.json")
        else:
            print("No changes needed")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_array_defaults()
