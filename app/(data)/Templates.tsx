const templates = [
    {
        name: "Blog Title Generator",
        desc: "An AI tool that generates blog titles based on your information.",
        category: "blog",
        icon: "https://cdn-icons-png.flaticon.com/128/686/686589.png",
        aiPrompt: "Generate creative blog titles based on the provided niche and outline.",
        slug: "blog-title-generator",
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
    },
    {
        name: "Hangman Game",
        desc: "A fun hangman game where AI generates words to guess.",
        category: "game",
        icon: "https://cdn-icons-png.flaticon.com/128/3039/3039363.png",
        aiPrompt: "Generate a list of words for a hangman game based on difficulty level.",
        slug: "hangman-game",
        form: [
            {
                label: "Select difficulty level",
                field: "dropdown",
                name: "difficulty",
                options: ["Easy", "Medium", "Hard"],
                required: true
            }
        ]
    },
    {
        name: "YouTube Video Editor",
        desc: "An AI-powered YouTube video editor for quick edits.",
        category: "video",
        icon: "https://cdn-icons-png.flaticon.com/128/1384/1384060.png",
        aiPrompt: "Suggest video edits and enhancements based on the provided video details.",
        slug: "youtube-video-editor",
        form: [
            {
                label: "Upload your video",
                field: "file",
                name: "video",
                required: true
            },
            {
                label: "Describe your editing needs",
                field: "textarea",
                name: "editDescription",
            }
        ]
    },
    {
        name: "Chess Move Predictor",
        desc: "An AI assistant that suggests the best next move in a chess game.",
        category: "game",
        icon: "https://cdn-icons-png.flaticon.com/128/2664/2664073.png",
        aiPrompt: "Analyze the chess board position and suggest the best move.",
        slug: "chess-move-predictor",
        form: [
            {
                label: "Upload chess board position",
                field: "file",
                name: "chessBoard",
                required: true
            }
        ]
    },
    {
        name: "Trivia Quiz Generator",
        desc: "Generate trivia questions based on any topic.",
        category: "game",
        icon: "https://cdn-icons-png.flaticon.com/128/3176/3176363.png",
        aiPrompt: "Generate a set of trivia questions and answers based on the chosen topic.",
        slug: "trivia-quiz-generator",
        form: [
            {
                label: "Enter topic",
                field: "input",
                name: "topic",
                required: true
            },
            {
                label: "Select difficulty",
                field: "dropdown",
                name: "difficulty",
                options: ["Easy", "Medium", "Hard"],
                required: true
            }
        ]
    },
    {
        name: "Sudoku Puzzle Solver",
        desc: "An AI that solves Sudoku puzzles instantly.",
        category: "game",
        icon: "https://cdn-icons-png.flaticon.com/128/3050/3050525.png",
        aiPrompt: "Solve the given Sudoku puzzle and provide the solution.",
        slug: "sudoku-solver",
        form: [
            {
                label: "Upload Sudoku puzzle image",
                field: "file",
                name: "sudokuImage",
                required: true
            }
        ]
    }
];

export default templates;
