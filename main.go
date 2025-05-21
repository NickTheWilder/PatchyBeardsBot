package main

import (
	"fmt"
	"os"
	"os/signal"
	"strings"
	"syscall"

	"github.com/bwmarrin/discordgo"
	"github.com/joho/godotenv"
)

func main() {
	// load .env file
	err := godotenv.Load()
	if err != nil {
		fmt.Println("error loading .env file:", err)
	}

	// get token from environment variable
	token := os.Getenv("DISCORD_BOT_TOKEN")
	if token == "" {
		fmt.Println("error: no token provided. set the DISCORD_BOT_TOKEN environment variable")
		return
	}

	// create a new discord session
	dg, err := discordgo.New("Bot " + token)
	if err != nil {
		fmt.Println("error creating Discord session:", err)
		return
	}

	// register the messageCreate function as a callback for MessageCreate events
	dg.AddHandler(messageCreate)

	// we only care about receiving message events
	dg.Identify.Intents = discordgo.IntentsGuildMessages

	// open a websocket connection to Discord and begin listening
	err = dg.Open()
	if err != nil {
		fmt.Println("error opening connection:", err)
		return
	}

	// wait here until CTRL-C or other term signal is received
	fmt.Println("Bot is now running. Press CTRL-C to exit.")
	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc

	// cleanly close down the Discord session
	dg.Close()
}

// this function will be called every time a message is created
func messageCreate(s *discordgo.Session, m *discordgo.MessageCreate) {
	// ignore all messages created by the bot itself
	if m.Author.ID == s.State.User.ID {
		return
	}

	// check if the message is "!ping"
	if strings.ToLower(m.Content) == "!ping" {
		// send "Pong!" back to the channel
		s.ChannelMessageSend(m.ChannelID, "Pong!")
	}
}
