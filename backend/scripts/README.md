# Backend Scripts

This folder contains utility scripts for backend operations.

## Available Scripts

### createAdmin.js

Creates or updates an admin user in the database.

#### Usage

```bash
# Using npm script (recommended)
npm run create-admin

# With default credentials (admin/admin123)
npm run create-admin

# With custom username and password
npm run create-admin admin mypassword

# Direct node execution
node scripts/createAdmin.js

# With arguments
node scripts/createAdmin.js admin mypassword
```

#### Examples

```bash
# Create admin with default credentials
npm run create-admin

# Create admin with custom credentials
npm run create-admin admin mypassword123

# Create admin with username only (will prompt for password)
node scripts/createAdmin.js admin
```

#### Notes

- The script will check if an admin with the same username already exists
- If admin exists, it will update the password
- If admin doesn't exist, it will create a new one
- Password is stored in plain text (as per project requirements - no bcrypt/JWT)
- Make sure your database connection is configured in `config/config.env`

#### Default Credentials

If no arguments are provided, the script uses:
- Username: `admin`
- Password: `admin123`

#### Environment Variables Required

Make sure `config/config.env` has:
```
DB_URL=your_mongodb_connection_string
```



