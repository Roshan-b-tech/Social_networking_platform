# 🗄️ MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Click "Try Free" or "Sign Up"
3. Create your account

## Step 2: Create a Cluster

1. **Choose Plan**: Select "FREE" tier (M0)
2. **Cloud Provider**: Choose AWS, Google Cloud, or Azure
3. **Region**: Select a region close to your users
4. **Cluster Name**: Name it `linkedin-clone-cluster`
5. Click "Create"

## Step 3: Set Up Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. **Username**: `linkedin-clone-user`
4. **Password**: Generate a secure password
5. **Database User Privileges**: Select "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. **For Development**: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. **For Production**: Add your Render IP addresses or use 0.0.0.0/0
5. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. **Driver**: Node.js
5. **Version**: 5.0 or later
6. Copy the connection string

## Step 6: Update Connection String

Replace the placeholder values in your connection string:

```
mongodb+srv://linkedin-clone-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/linkedin-clone?retryWrites=true&w=majority
```

- Replace `YOUR_PASSWORD` with the password you created
- Replace `linkedin-clone` with your desired database name

## Step 7: Test Connection

You can test the connection locally:

```bash
# Add to your .env file
MONGODB_URI=mongodb+srv://linkedin-clone-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/linkedin-clone?retryWrites=true&w=majority

# Start your server
cd server
npm run dev
```

## Security Best Practices

1. **Use Environment Variables**: Never hardcode the connection string
2. **Strong Passwords**: Use a strong, unique password
3. **Network Restrictions**: In production, restrict IP access
4. **Regular Backups**: Enable automatic backups
5. **Monitor Usage**: Keep track of your database usage

## Troubleshooting

### Connection Issues
- Check if your IP is whitelisted
- Verify username and password
- Ensure the cluster is running

### Performance Issues
- Check your cluster tier
- Monitor query performance
- Consider indexing frequently queried fields 