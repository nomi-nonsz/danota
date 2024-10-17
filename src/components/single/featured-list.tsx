'use client'

import { ChefHat, Lightbulb, Wrench } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export const FeaturedList = () => {
  const featuredNotes = [
    { icon: ChefHat , title: "How to make crispiest french fries", views: 823, comments: 5 },
    { icon: Lightbulb, title: "How RAM works", views: 402, comments: 5 },
    { icon: Wrench, title: "Best AI Tools", views: 371, comments: 2 },
    { icon: ChefHat , title: "How to make crispiest french fries", views: 823, comments: 5 },
    { icon: Wrench, title: "Best AI Tools", views: 371, comments: 2 },
    { icon: Lightbulb, title: "How RAM works", views: 402, comments: 5 },
    { icon: Wrench, title: "Best AI Tools", views: 371, comments: 2 },
    { icon: ChefHat , title: "How to make crispiest french fries", views: 823, comments: 5 },
    { icon: Lightbulb, title: "How RAM works", views: 402, comments: 5 },
  ]

  return (
    <section className="home-container">
      <h2 className="text-2xl font-semibold mb-6">Featured public notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredNotes.map((note, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {note.title}
              </CardTitle>
              <div className="border p-2 rounded-md">
                <note.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
                Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  {note.views}
                </div>
                <div className="flex items-center">
                  <Wrench className="h-3 w-3 mr-1" />
                  {note.comments}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}