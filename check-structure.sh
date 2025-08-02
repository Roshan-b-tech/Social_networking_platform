#!/bin/bash
echo "🔍 Checking repository structure..."
echo "=================================="

echo "📁 Current directory: $(pwd)"
echo "📋 Directory contents:"
ls -la

echo ""
echo "📁 Server directory check:"
if [ -d "server" ]; then
    echo "✅ Server directory exists"
    echo "📋 Server directory contents:"
    ls -la server/
    
    echo ""
    echo "📄 Server package.json check:"
    if [ -f "server/package.json" ]; then
        echo "✅ server/package.json exists"
        echo "📋 Package.json contents:"
        cat server/package.json
    else
        echo "❌ server/package.json not found"
    fi
    
    echo ""
    echo "📄 Server.js check:"
    if [ -f "server/server.js" ]; then
        echo "✅ server/server.js exists"
    else
        echo "❌ server/server.js not found"
    fi
else
    echo "❌ Server directory not found"
fi

echo ""
echo "🔍 Repository structure check complete!" 