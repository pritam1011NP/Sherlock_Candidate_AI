import { Paper, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

export default function ResumeUpload({ file, setFile }) {

    const { getRootProps, getInputProps } = useDropzone({

        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },

        multiple: false,

        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                setFile(acceptedFiles[0]);
            }
        },

    });

    return (

        <Paper
            {...getRootProps()}
            sx={{
                p: 4,
                textAlign: "center",
                border: "2px dashed #1976d2",
                cursor: "pointer",
            }}
        >

            <input {...getInputProps()} />

            <Typography variant="h6">
                Resume Upload
            </Typography>

            <Typography color="text.secondary">

                {file ? file.name : "Drag Resume Here"}

            </Typography>

        </Paper>

    );

}