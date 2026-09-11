"""Optional independent GIF check. Requires Pillow; reads images without editing."""
from pathlib import Path
from hashlib import sha256
from collections import Counter
import json
from PIL import Image

media = Path(__file__).resolve().parent.parent / "media"
for language in ("zh", "en"):
    filename = media / f"fde-motion-{language}.gif"
    with Image.open(filename) as im:
        assert im.size == (1100, 650)
        assert im.n_frames == 360
        assert im.info.get("loop") == 0
        delays, stage_hashes = [], []
        for i in range(im.n_frames):
            im.seek(i)
            delays.append(im.info.get("duration", 0))
            # Exclude header, text column, navigation and footer progress bar.
            stage = im.convert("RGB").crop((453, 96, 1058, 512))
            stage_hashes.append(sha256(stage.tobytes()).hexdigest())
        assert set(delays) == {50}, Counter(delays)
        assert sum(delays) == 18000
        assert len(set(stage_hashes)) >= 350, "Main stage is mostly static"
        assert filename.stat().st_size < 5_000_000
        print(json.dumps({"language": language, "frames": im.n_frames,
                          "duration_ms": sum(delays), "frame_delays_ms": dict(Counter(delays)),
                          "unique_main_stage_frames": len(set(stage_hashes)),
                          "result": "pass"}))
