module.exports = (mongoose) => {
    const TaskSchema = mongoose.model(
        'task',
        mongoose.Schema(
            {
                id: String,
                name: String,
                description: String,
                startTime: Date,
                endTime: Date
            },
            { timestamps: true }
        )
    );

    return TaskSchema;
};