import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    LinearProgress,
} from "@mui/material";

export default function DashboardCard({

    title,
    value,
    subtitle,
    icon,
    color,
    // No fake default anymore — only renders if the parent actually
    // passes a real trend value (e.g. trend="+12%" computed from data).
    trend,
    // Same idea: pass an actual 0-100 number to show progress-to-goal.
    // Omit it (as StatisticsCards currently does) and the bar just
    // won't render, instead of always showing a meaningless full bar.
    progress,

}) {

    return (

        <Card
            elevation={0}
            sx={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: 3,
                minHeight: 190,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(180deg, #F7F2E7 0%, #F0E9D8 100%)",
                border: "1px solid rgba(201,162,39,0.3)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "8%",
                    right: "8%",
                    height: 3,
                    background: "linear-gradient(90deg, transparent, #C9A227, transparent)",
                },

                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 36px -14px rgba(0,0,0,0.45)",
                    borderColor: "rgba(201,162,39,0.55)",
                },
            }}
        >

            {/*
                display:flex + flexDirection:"column" here, with the last
                block below pinned via mt:"auto", is what keeps the chip/
                progress row lined up at the same height across every card
                in the row — even when one subtitle wraps and another doesn't.
            */}
            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                    pb: "24px !important",
                }}
            >

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >

                    <Box>

                        <Typography
                            sx={{ color: "rgba(27,27,27,0.6)" }}
                            fontSize={14}
                        >
                            {title}
                        </Typography>

                        <Typography
                            fontWeight={700}
                            sx={{
                                fontSize: 40,
                                mt: 1,
                                color: "#1B1B1B",
                                lineHeight: 1,
                            }}
                        >
                            {value}
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            flexShrink: 0,
                            borderRadius: "16px",
                            bgcolor: `${color}1F`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: color,
                        }}
                    >
                        {icon}
                    </Box>

                </Box>

                <Typography
                    mt={1}
                    sx={{ color: "rgba(27,27,27,0.55)" }}
                    fontSize={14}
                >
                    {subtitle}
                </Typography>

                {(trend || progress != null) && (

                    <Box mt="auto" pt={2}>

                        {trend && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={progress != null ? 1.5 : 0}
                            >

                                <Chip
                                    size="small"
                                    label={trend}
                                    color="success"
                                    variant="outlined"
                                />

                                <Typography
                                    fontSize={12}
                                    sx={{ color: "rgba(27,27,27,0.5)" }}
                                >
                                    Updated now
                                </Typography>

                            </Box>
                        )}

                        {progress != null && (
                            <LinearProgress
                                variant="determinate"
                                value={Math.max(0, Math.min(100, progress))}
                                sx={{
                                    height: 8,
                                    borderRadius: 5,
                                    bgcolor: "rgba(201,162,39,0.15)",
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: color,
                                        borderRadius: 5,
                                    },
                                }}
                            />
                        )}

                    </Box>

                )}

            </CardContent>

        </Card>

    );

}