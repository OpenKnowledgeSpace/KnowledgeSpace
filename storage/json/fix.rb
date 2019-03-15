require 'json'

Dir.glob('categories/category_*.json').each do |file|
json = JSON.parse(IO.read(file))
json["terms"].delete_if { |v| v.values.first.length > 15 }
File.open("#{file.gsub('categories/', '')}", 'w' ) { |f| f << json.to_json } 
end

