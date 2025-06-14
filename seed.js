require('dotenv').config()
const mongoose = require('mongoose')
const { User, Group, Expense, Settlement } = require('./model/schema')

// 1. Connect to DB
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB...')

        // 2. Clear existing data (optional)
        await User.deleteMany({})
        await Group.deleteMany({})
        await Expense.deleteMany({})
        await Settlement.deleteMany({})

        // 3. Seed Users
        const users = await User.insertMany([
            {
                firstName: 'Alice',
                lastName: 'Smith',
                emailId: 'alice@example.com',
                password: 'hashedpassword1'
            },
            {
                firstName: 'Bob',
                lastName: 'Johnson',
                emailId: 'bob@example.com',
                password: 'hashedpassword2'
            }
        ])

        // 4. Seed Group
        const group = await Group.create({
            groupName: 'Trip to Goa',
            groupDescription: 'A fun trip with friends',
            groupOwner: "demo@Bhaghidaari.app",
            groupMembers: ["demo@codesangam.app", "friend@codesangam.app"],
            groupCategory: 'Travel',
            groupTotal: 0,
            split: []
        })

        // 5. Seed Expense
        const expense = await Expense.create({
            groupId: group._id,
            expenseName: 'Hotel Booking',
            expenseDescription: '2 nights stay at resort',
            expenseAmount: 4000,
            expenseCategory: 'Accommodation',
            expenseOwner: "demo@Bhaghidaari.app",
            expenseMembers: ["demo@codesangam.app", "friend@codesangam.app"],
            expensePerMember: 2000,
            expenseType: 'UPI'
        })

        // 6. Seed Settlement
        const settlement = await Settlement.create({
            groupId: group._id,
            settleTo: "demo@Bhaghidaari.app",
            settleFrom: "friend@codesangam.app",
            settleDate: new Date().toISOString(),
            settleAmount: 2000
        })

        console.log('✅ Demo data seeded successfully.')
        mongoose.disconnect()
    })
    .catch(err => {
        console.error('DB Seed Error:', err)
        mongoose.disconnect()
    })
