import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "P",
    role: "Food Lover",
    content: "FoodieGo has completely changed how I order food. Super fast delivery and the food always arrives hot and fresh!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Verma",
    avatar: "R",
    role: "Regular Customer",
    content: "Amazing variety of restaurants and the discounts are unbeatable. My go-to app for midnight cravings!",
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya Patel",
    avatar: "A",
    role: "Busy Professional",
    content: "The real-time tracking feature is a game-changer. I always know exactly when my food will arrive.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">
            Join thousands of happy food lovers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-hover bg-card p-6 rounded-2xl border border-border/50"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-rating fill-rating" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
