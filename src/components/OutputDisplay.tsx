import { Show, createSignal } from "solid-js";
import { store } from "../store";
import confetti from 'canvas-confetti';

function readableFileSize(size: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const unitIndex = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, unitIndex)).toFixed(2) + ' ' + units[unitIndex];
}

function playConfetti(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;
  confetti({
    particleCount: 100,
    spread: 70,
    ticks: 60,
    origin: { x, y },
  })
}


export function OutputDisplay() {
  const [showDonate, setShowDonate] = createSignal(false)

  return <Show when={store.outputFileURL}>
    <section
      class="bg-slate-2 rounded-xl p-4 mt-4 animate-zoom-in animate-duration-300 animate-ease-out"
      ref={e => setTimeout(() => playConfetti(e!), 50)}
    >
      <h2>Output</h2>
      <p>File size: {readableFileSize(store.outputFileContent?.length || 0)}</p>
      <p>
        <a
          class="decoration-none text-blue-500 hover:underline"
          download={store.file?.name + ".gif"} href={store.outputFileURL}
        >
          <i class="i-mdi-download mr-1"></i>
          Download GIF
        </a>
      </p>
      <img src={store.outputFileURL} alt="output" class="block mx-auto max-w-full rounded-xl" />
    </section>

    <div class="justify-center items-center mt-4 flex gap-2">
      Feeling helpful?

      <button class="rounded p-4 py-2 bg-emerald-6 text-white cursor-pointer"
        onClick={() => { window.open('https://ko-fi.com/W7W0WWVJE', '_blank') }}
        onMouseEnter={() => { setShowDonate(true) }}
      >
        <i class="i-mdi-coffee"></i> Buy me a Coffee
      </button>

      <button class="rounded p-4 py-2 bg-emerald-6 text-white cursor-pointer" onClick={() => {
        const message = '🎬⇒🎆 Video to GIF, in local, blazing fast⚡\n\nhttps://lyonbot.github.io/video-to-gif/\n\nJust found a handy web-app that convert video to GIF, no installing, blazing fast! 🤩 Check it out!'
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, 'tweetShare')
      }}>
        <i class="i-mdi-twitter"></i> Tell Friends
      </button>
    </div>

    {/* only render when language is zh-CN and hover on Donate button */}
    {(navigator.language === 'zh-CN') && <>
      <Show when={showDonate()}>
        <div class="mt-4 text-center">
          <img src="https://yons.site/donate1.png" class="max-w-full" onload={e => e.currentTarget.scrollIntoView()} />
        </div>
      </Show>
      <link rel="preload" as="image" href="https://yons.site/donate1.png" />
    </>}
  </Show>
}