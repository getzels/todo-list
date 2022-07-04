module.exports = (mongoose) => {
    const TaskSchema = mongoose.model(
        'task',
        mongoose.Schema(
            {
                id: String,
                name: String,
                description: String,
                userid: String,
                startTime: Date,
                endTime: Date
            }
        )
    );

    return TaskSchema;
};