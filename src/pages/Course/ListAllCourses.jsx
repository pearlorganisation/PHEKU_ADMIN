import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../features/actions/courseAction'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import parse from 'html-react-parser';

const ListAllCourses = () => {
    const dispatch = useDispatch();
    const { coursesData } = useSelector((state) => state.course);

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    return (
        <main className="flex-1 p-8 mt-16 ml-64 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Available Courses</h1>

                <div className="grid grid-cols-1 gap-6">
                    {coursesData?.map((course) => (
                        <Card
                            key={course?._id}
                            className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden"
                        >
                            <div className="flex">
                                {/* University Logo Placeholder */}
                                <CardMedia
                                    component="img"
                                    alt={course?.university?.name}
                                    image={course?.university?.coverPhoto}
                                    className="w-1/3 h-auto object-cover"
                                />

                                <CardContent className="w-2/3">
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        className="font-bold text-xl mb-4"
                                    >
                                        {course?.name}
                                    </Typography>

                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <Typography>
                                            <strong>University:</strong> {course?.university?.name}
                                        </Typography>

                                        <Typography>
                                            <strong>Country:</strong> {course?.country?.name}
                                        </Typography>

                                        <Typography>
                                            <strong>Course Level:</strong> {course?.courseLevel?.level}
                                        </Typography>

                                        <Typography>
                                            <strong>Specialization:</strong> {course?.specialization?.name}
                                        </Typography>

                                        <Typography>
                                            <strong>Duration:</strong> {course?.duration} months
                                        </Typography>

                                        <Typography>
                                            <strong>Tuition:</strong> ${course?.tutionFees?.amount} {course?.tutionFees?.currency}
                                        </Typography>

                                        <div className="col-span-2">
                                            <Typography className="font-semibold">
                                                <strong>Global Rank:</strong> {course?.university?.ranking?.global}
                                            </Typography>
                                        </div>
                                    </div>

                                    {/* Description Accordion */}
                                    <Accordion
                                        className="mt-4"
                                        sx={{
                                            boxShadow: 'none',
                                            '&:before': {
                                                display: 'none',
                                            }
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel-description"
                                            id="panel-description-header"
                                            className="px-0"
                                        >
                                            <Typography className="font-semibold">Course Description</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="px-0">
                                            <Typography>
                                                {parse(course?.description ?? "")}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>

                {(!coursesData || coursesData.length === 0) && (
                    <div className="text-center text-gray-500 mt-12">
                        No courses available at the moment.
                    </div>
                )}
            </div>
        </main>
    );
};


export default ListAllCourses