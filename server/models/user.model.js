const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, "Password must be 8 characters or longer"]
    },
    },
    {timestamps: true},
);

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match!');
    }
    next();
});

UserSchema.pre('save', async function (next) {
    console.log('IN PRE SAVE:', this.password);
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log('HASHED:', hashedPassword);
        this.password = hashedPassword;
        next();
    } catch (error) {
    console.log('ERROR IN SAVE', error);
    }
});

module.exports = mongoose.model('User', UserSchema);