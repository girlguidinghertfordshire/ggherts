#!/usr/bin/env ruby
# Updates or inserts a YAML front matter `lastmod` key on staged content files.
# Run as a pre-commit hook to ensure pages have up-to-date `lastmod`.

require 'time'

# Get staged files
staged = `git diff --cached --name-only`.split("\n")

# Target extensions and skip generated/output paths
TARGET_EXT = %w[.md .markdown .html]
SKIP_DIRS = ["_site/", "node_modules/"]

now = Time.now.strftime('%Y-%m-%dT%H:%M:%S')

staged.each do |path|
  next if path.nil? || path.empty?
  next if SKIP_DIRS.any? { |d| path.start_with?(d) || path.include?("/#{d}") }
  ext = File.extname(path).downcase
  next unless TARGET_EXT.include?(ext)
  next unless File.exist?(path)

  content = File.binread(path)

  # Detect YAML front matter starting at the beginning of the file
  if content.start_with?("---\n")
    fm_end_idx = content.index("\n---\n", 4)
    # If no closing marker, skip (invalid front matter)
    next unless fm_end_idx

    fm = content[4...fm_end_idx] # exclude opening '---\n' and closing delimiter
    body = content[(fm_end_idx + 5)..-1] || ""

    lines = fm.split("\n")
    lastmod_line_idx = lines.index { |l| l.strip.start_with?('lastmod:') }

    if lastmod_line_idx
      # Replace value while keeping quotes
      lines[lastmod_line_idx] = "lastmod: '#{now}'"
    else
      # Insert lastmod near the top, after the first line to avoid disrupting ordering
      insert_idx = [1, lines.length].min
      lines.insert(insert_idx, "lastmod: '#{now}'")
    end

    new_fm = lines.join("\n")
    new_content = "---\n" + new_fm + "\n---\n" + body

    if new_content != content
      File.binwrite(path, new_content)
      # Re-stage the file
      `git add -- "#{path}"`
    end
  else
    # No front matter; add lastmod at top
    new_content = "---\nlastmod: '#{now}'\n---\n" + content
    File.binwrite(path, new_content)
    `git add -- "#{path}"`
  end
end
