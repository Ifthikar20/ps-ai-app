const templates = [
    {
        name: "Blog Title",
        desc: "An AI tool that generates blog titles based on your information",
        category: 'blog',
        icon: "https://cdn-icons-png.flaticon.com/128/686/686589.png",
        aiPrompt: "generate questions and answers, and show the response in the format of a JSON",
        slug: "generate-question-title",
        form: [
            {
                label: "Enter your niche",
                field: "input",
                name: "niche",
                required: true
            },
            {
                label: "Enter your niche outline",
                field: "textarea",
                name: "outline",
            },
        ]
    }
];

export default templates;
