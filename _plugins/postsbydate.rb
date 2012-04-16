# Based on Bruce Cooper's postsbydate.rb
# https://github.com/brucejcooper/8bitcloud.com/blob/master/_plugins/postsbydate.rb
# http://www.8bitcloud.com/2010/12/29/posts-in-tree.html
module Jekyll
  class Site
    # Sort posts by category and date
    def postsbycategory
      categories = []

      self.categories.sort.each do |category_name, posts|
        category = {}
        category["name"] = category_name
        category["posts"] = posts.sort {|x,y| y.date <=> x.date }
        categories.push( category )
      end
      
      return categories
    end

    # Extends Site to have an field that gives you a map of posts by year and category.
    def postsbyyear

      # Create a tree of the posts by year and then month
      tree = {}
      self.posts.each do |post|
        year = post.date.year
        month = post.date.month
        if tree[year] == nil
          tree[year] = { "number" => year, 
                         "count"  => 0, 
                         "months" => {} }
      end
      if tree[year]["months"][month] == nil
        tree[year]["months"][month] = { "number" => month, 
                                        "name"   => Date::MONTHNAMES[month],  
                                        "count"  => 0, 
                                        "posts"  => [] }
      end
   
      tree[year]["months"][month]["posts"] << post
      end

      # Turn the tree into sorted arrays, so it is easier to interpret
      # in liquid
      years = tree.values.sort { |x, y| y["number"] <=> x["number"] }

      # Calculate counts of posts and sort each of the months as well
      years.each do |year|
        year["months"] = year["months"].values.sort { |x, y| y["number"] <=> x["number"] }

        year["months"].each do |month| 
          month["count"] = month["posts"].size
          month["posts"] = month["posts"].sort {|x,y| y.date <=> x.date }
        end

        sum = 0
        year["months"].each {|month| sum += month["count"] }
        year["count"] = sum
      end

      return years
    end

    # Redefine site_payload to include our posts by year.  This is ugly
    # but I don't know how else to do this without changing the jekyll code
    # itself.  #rubynoob
    def site_payload
      {   "site" => self.config.merge({
                    "time"             => self.time,
                    "posts"            => self.posts.sort { |a,b| b <=> a },
                    "pages"            => self.pages,
                    "html_pages"       => self.pages.reject { |page| !page.html? },
                    "categories"       => post_attr_hash('categories'),
                    "tags"             => post_attr_hash('tags'),
                    "postsbyyear"      => self.postsbyyear,
                    "postsbycategory"  => self.postsbycategory })  }
    end

  end

end