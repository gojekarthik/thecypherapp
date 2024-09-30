'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from 'lucide-react'

// Replace with your SoundCloud API client ID
const CLIENT_ID = 'YOUR_SOUNDCLOUD_CLIENT_ID'

interface Track {
  id: number
  title: string
  user: { username: string }
}

export default function SoundCloudSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.soundcloud.com/tracks?q=${encodeURIComponent(searchQuery)}&client_id=${CLIENT_ID}`)
      if (!response.ok) {
        throw new Error('Failed to fetch tracks')
      }
      const data = await response.json()
      setTracks(data)
    } catch (error) {
      console.error('Error searching tracks:', error)
      setError('An error occurred while searching. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const playTrack = (trackId: number) => {
    setCurrentTrack(trackId)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>SoundCloud Track Search</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search for tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {tracks.map((track) => (
              <Button
                key={track.id}
                variant="outline"
                className="justify-start h-12 px-4"
                onClick={() => playTrack(track.id)}
              >
                <span className="truncate">{track.title} - {track.user.username}</span>
              </Button>
            ))}
          </div>
        )}

        {currentTrack && (
          <div className="mt-6">
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${currentTrack}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
              title="SoundCloud Player"
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  )
}