"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getSlides, type Slide } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSlider() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch slides data
    useEffect(() => {
        const fetchSlides = async () => {
            try {
                setLoading(true);
                const data = await getSlides();
                setSlides(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch slides:", err);
                setError("Không thể tải dữ liệu slider. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || slides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Loading state
    if (loading) {
        return (
            <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen bg-gray-100">
                <Skeleton className="w-full h-full" />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">
                        Lỗi
                    </h2>
                    <p className="text-gray-700">{error}</p>
                </div>
            </div>
        );
    }

    // No slides
    if (slides.length === 0) {
        return (
            <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Không có dữ liệu
                    </h2>
                    <p className="text-gray-700">Không tìm thấy slider nào.</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Slides */}
            <div className="relative h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Image
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 hidden" />
                        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
                            <div className="max-w-4xl px-4">
                                <div className="mb-6 lg:mb-8">
                                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic mb-4 animate-fade-in-up">
                                        {slide.title}
                                    </h1>
                                    <h2 className="text-base sm:text-lg md:text-xl lg:text-3xl font-serif italic animate-fade-in-up animation-delay-300">
                                        {slide.subtitle}
                                    </h2>
                                    <div className="mt-6 lg:mt-8 animate-fade-in-up animation-delay-600">
                                        <Button
                                            className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105"
                                            asChild
                                        >
                                            <a href={slide.buttonLink}>
                                                {slide.buttonText}
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? "bg-yellow-600 scale-125"
                                : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
