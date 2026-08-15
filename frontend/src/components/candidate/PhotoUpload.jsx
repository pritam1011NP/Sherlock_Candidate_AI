import { Paper, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

export default function PhotoUpload({ file, setFile }) {

    const { getRootProps, getInputProps } = useDropzone({

        accept: {
            "image/*": [".png", ".jpg", ".jpeg"],
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
                border: "2px dashed green",
                cursor: "pointer",
            }}
        >

            <input {...getInputProps()} />

            {
                file ? (

                    <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        style={{
                            width: 120,
                            borderRadius: 10,
                            marginBottom: 15,
                        }}
                    />

                ) : (

                    <Typography variant="h6">
                        Upload Photo
                    </Typography>

                )
            }

            <Typography color="text.secondary">

                {file ? file.name : "JPG / PNG"}

            </Typography>

        </Paper>

    );

}