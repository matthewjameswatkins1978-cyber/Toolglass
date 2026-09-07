import { buttondownUsername } from '@/lib/site';

export default function NewsletterSignup() {
  return (
    <section className="newsletter-signup" aria-labelledby="newsletter-title">
      <div>
        <p className="eyebrow">THE TOOLGLASS LETTER</p>
        <h2 id="newsletter-title">Toolglass, occasionally.</h2>
        <p>New reviews, strange software and useful things that deserved more attention.</p>
      </div>
      {buttondownUsername ? (
        <form
          action={`https://buttondown.com/api/emails/embed-subscribe/${buttondownUsername}`}
          method="post"
        >
          <label htmlFor="newsletter-email">Email</label>
          <div className="newsletter-fields">
            <input id="newsletter-email" name="email" type="email" placeholder="you@example.com" required />
            <input type="hidden" name="embed" value="1" />
            <button type="submit">Subscribe ↗</button>
          </div>
          <p className="small">You can unsubscribe at any time. No scraped lists.</p>
        </form>
      ) : (
        <p className="newsletter-pending">
          The subscription desk is being connected. The letter will open here once its
          Buttondown account is ready.
        </p>
      )}
    </section>
  );
}

